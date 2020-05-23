import {
    Resolver,
    ObjectTypeComposer,
    ResolverResolveParams,
} from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { Schema } from 'mongoose';

import { ServerModuleOptions, ServerModuleModel } from '@uls/core-nodejs';
import { authMiddleware } from '@uls/auth-nodejs';
import { Role } from '@uls/auth-common';

import { createSongModel, MODEL_NAME as SONG_MODEL_NAME } from './songModel';

interface TCProps {
    ChordTC: ObjectTypeComposer;
    AuthorTC: ObjectTypeComposer;
    StrummingPatternTC: ObjectTypeComposer;
    MetronomePresetTC: ObjectTypeComposer;
}

export const createSongSchema = (
    options: ServerModuleOptions<ObjectTypeComposer>,
    { ChordTC, AuthorTC, StrummingPatternTC, MetronomePresetTC }: TCProps
) => {
    const SongModels = createSongModel(options);
    const SongModelCreated = SongModels[SONG_MODEL_NAME];
    const ChordPositionCreated = SongModels.ChordPosition;
    const SongLikesCreated = SongModels.SongLikes;

    const ChordPositionTC = composeWithMongoose(ChordPositionCreated, {});
    ChordPositionTC.addRelation('chord', {
        resolver: () => ChordTC.getResolver('findById'),
        prepareArgs: {
            _id: source => source.chordId,
        },
        projection: { chordId: 1 },
    });

    const SongTC = composeWithMongoose(SongModelCreated, {});

    SongTC.setIsTypeOf((obj, context, info) => {
        return obj instanceof SongModelCreated;
    });

    SongTC.addResolver({
        name: 'search',
        args: { query: 'String!' },
        type: [SongTC],
        resolve: async (req: any) => {
            const { query } = req.args;
            const found = await SongModelCreated.find({
                title: { $regex: query, $options: 'ix' },
            });
            return found;
        },
    });

    const updateOrCreateMetronome = async (
        { tempo }: { tempo: number },
        otherProps: any
    ) => {
        try {
            const metronomeProps = {
                ...otherProps,
                args: { record: { tempo } },
            };
            const metronomeResult = await MetronomePresetTC.getResolver(
                'findOrCreate'
            ).resolve(metronomeProps);
            return metronomeResult.recordId;
        } catch (err) {
            console.log(err);
        }
    };

    const updateOrCreateStrummingPattern = async (
        {
            pattern,
            metronomePresetId,
        }: { pattern: number[]; metronomePresetId?: string },
        otherProps: any
    ) => {
        try {
            const strummingProps = {
                ...otherProps,
                args: {
                    record: {
                        pattern,
                        metronomePresetId,
                    },
                },
            };
            const strummingResult = await StrummingPatternTC.getResolver(
                'createOne'
            ).resolve(strummingProps);
            return strummingResult.recordId;
        } catch (err) {
            console.log(err);
        }
    };

    const prepareSong = async (
        resolveProps: ResolverResolveParams<any, any>
    ) => {
        let metronomeId = await updateOrCreateMetronome(
            { tempo: resolveProps.args.tempo },
            resolveProps
        );

        let strummingPatternId = await updateOrCreateStrummingPattern(
            {
                pattern: resolveProps.args.strummingPattern,
                metronomePresetId: metronomeId,
            },
            resolveProps
        );

        const songProps = {
            ...resolveProps,
            args: { record: {} as any },
        };

        songProps.args.record = { ...resolveProps.args.song };
        songProps.args.record.creatorId = resolveProps.context.user._id;
        songProps.args.record.strummingPatternId = strummingPatternId;
        resolveProps.args._id &&
            (songProps.args.record._id = resolveProps.args._id); // for update

        return songProps;
    };

    SongTC.addResolver({
        name: 'createNested',
        args: {
            song: SongTC.getITC()
                .removeField(['strummingPatternId', 'creatorId', '_id'])
                .makeRequired(['title', 'lyrics', 'chordsIds']),
            strummingPattern: StrummingPatternTC.getITC().getField('pattern'),
            tempo: MetronomePresetTC.getITC().getField('tempo'),
        },
        type: SongTC.getResolver('createOne').getType(),
        resolve: async (resolveProps: ResolverResolveParams<any, any>) => {
            const songProps = await prepareSong(resolveProps);

            return SongTC.getResolver('createOne').resolve(songProps);
        },
    });

    SongTC.addResolver({
        name: 'updateNested',
        args: {
            _id: SongTC.getResolver('updateById')
                .getArgITC('record')
                .getFieldTC('_id'),
            song: SongTC.getITC()
                .removeField(['strummingPatternId', 'creatorId'])
                .makeRequired(['title', 'lyrics', 'chordsIds']),
            strummingPattern: StrummingPatternTC.getITC().getField('pattern'),
            tempo: MetronomePresetTC.getITC().getField('tempo'),
        },
        type: SongTC.getResolver('updateById').getType(),
        resolve: async (resolveProps: ResolverResolveParams<any, any>) => {
            const songProps = await prepareSong(resolveProps);
            return SongTC.getResolver('updateById').resolve(songProps);
        },
    });

    SongTC.addRelation('chords', {
        resolver: () => ChordTC.getResolver('findMany'),
        prepareArgs: {
            filter: source => ({ _ids: source.chordsIds }),
        },
        projection: { chordsIds: 1 },
    });

    SongTC.addRelation('author', {
        resolver: () => AuthorTC.getResolver('findById'),
        prepareArgs: {
            _id: source => source.authorId,
        },
        projection: { authorId: 1 },
    });

    SongTC.addRelation('strummingPattern', {
        resolver: () => StrummingPatternTC.getResolver('findById'),
        prepareArgs: {
            _id: source => source.strummingPatternId,
        },
        projection: { strummingPatternId: 1 },
    });

    SongTC.addRelation('creator', {
        resolver: () => options.creatorModel?.getResolver('findById'),
        prepareArgs: {
            _id: source => source.creatorId,
        },
        projection: { creatorId: 1 },
    });

    SongTC.addRelation('liked', {
        resolver: () => SongLikesTC.getResolver('isLiked'),
        prepareArgs: {
            songId: source => source._id,
        },
        projection: { _id: 1 },
    });

    const SongLikesTC = composeWithMongoose(SongLikesCreated, {});

    SongLikesTC.addRelation('user', {
        resolver: () => options.creatorModel?.getResolver('findById'),
        prepareArgs: {
            _id: source => source.userId,
        },
        projection: { userId: true },
    });

    SongLikesTC.addRelation('song', {
        resolver: () => SongTC.getResolver('findById'),
        prepareArgs: {
            _id: source => source.songId,
        },
        projection: { songId: true },
    });

    SongLikesTC.addResolver({
        name: 'like',
        args: {
            songId: `MongoID!`,
        },
        type: SongLikesTC.getResolver('createOne').getType(),
        resolve: async (resolveProps: ResolverResolveParams<any, any>) => {
            resolveProps.args.userId = resolveProps.context.user._id;
            resolveProps.args.record = { ...resolveProps.args };

            const songLike = await SongLikesCreated.findOne(
                resolveProps.args.record
            );

            if (!!songLike) {
                return { record: songLike, recordId: songLike._id };
            }

            return SongLikesTC.getResolver('createOne').resolve(resolveProps);
        },
    });

    SongLikesTC.addResolver({
        name: 'dislike',
        args: {
            songId: `MongoID!`,
        },
        type: SongLikesTC.getResolver('createOne').getType(),
        resolve: async (resolveProps: ResolverResolveParams<any, any>) => {
            const songLike = await SongLikesCreated.findOneAndDelete({
                songId: resolveProps.args.songId,
                userId: resolveProps.context.user._id,
            });
            return { record: songLike, recordId: songLike?._id };
        },
    });

    SongLikesTC.addResolver({
        name: 'likedSongs',
        args: {},
        type: [SongLikesTC],
        resolve: async (resolveProps: ResolverResolveParams<any, any>) => {
            if (!resolveProps.context.user._id) {
                return [];
            }
            resolveProps.args.userId = resolveProps.context.user._id;
            return SongLikesTC.getResolver('findMany').resolve(resolveProps);
        },
    });

    SongLikesTC.addResolver({
        name: 'isLiked',
        args: {
            songId: `MongoID!`,
        },
        type: 'Boolean',
        resolve: async (resolveProps: ResolverResolveParams<any, any>) => {
            if (!resolveProps.context?.user?._id) {
                return false;
            }

            resolveProps.args.userId = resolveProps.context.user._id;
            resolveProps.args.record = { ...resolveProps.args };

            const res = await SongLikesCreated.findOne(
                resolveProps.args.record
            );

            return !!res;
        },
    });

    const authenticated = authMiddleware(options.errors.authorizationError);

    const query = {
        songById: SongTC.getResolver('findById'),
        songByIds: SongTC.getResolver('findByIds'),
        songOne: SongTC.getResolver('findOne'),
        songMany: SongTC.getResolver('findMany'),
        songCount: SongTC.getResolver('count'),
        songPagination: SongTC.getResolver('pagination'),
        likedSongs: SongLikesTC.getResolver('likedSongs', [
            authenticated(Role.USER),
        ]),
    };

    const mutation = {
        songCreateOne: SongTC.getResolver('createNested', [
            authenticated(Role.MODERATOR),
        ]),
        songUpdateById: SongTC.getResolver('updateNested', [
            authenticated(Role.MODERATOR),
        ]),
        songLike: SongLikesTC.getResolver('like', [authenticated(Role.USER)]),
        songDislike: SongLikesTC.getResolver('dislike', [
            authenticated(Role.USER),
        ]),
    };

    const songModel: Omit<
        ServerModuleModel<any, Resolver, ObjectTypeComposer>,
        'seed'
    > = {
        mutation,
        query,
        name: SONG_MODEL_NAME,
        typeComposer: SongTC,
        searchQuery: SongTC.getResolver('search'),
    };

    return songModel;
};
