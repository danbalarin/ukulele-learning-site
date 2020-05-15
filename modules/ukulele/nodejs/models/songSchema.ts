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
    { ChordTC, AuthorTC, StrummingPatternTC, MetronomePresetTC }: TCProps,
    chordSchema: Schema
) => {
    const SongModelCreated = createSongModel(options, chordSchema);

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
                name: { $regex: query, $options: 'ix' },
            });
            return found;
        },
    });

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
            let metronomeId;
            try {
                const metronomeProps = {
                    ...resolveProps,
                    args: { record: { tempo: resolveProps.args.tempo } },
                };
                const metronomeResult = await MetronomePresetTC.getResolver(
                    'findOrCreate'
                ).resolve(metronomeProps);
                metronomeId = metronomeResult.recordId;
            } catch (err) {
                console.log(err);
            }

            let strummingPatternId;
            try {
                const strummingProps = {
                    ...resolveProps,
                    args: {
                        record: {
                            pattern: resolveProps.strummingPattern,
                            metronomePresetId: metronomeId,
                        },
                    },
                };
                const strummingResult = await StrummingPatternTC.getResolver(
                    'createOne'
                ).resolve(strummingProps);
                strummingPatternId = strummingResult.recordId;
            } catch (err) {
                console.log(err);
            }

            const songProps = {
                ...resolveProps,
                args: { record: {} as any },
            };

            songProps.args.record = { ...resolveProps.args.song };
            songProps.args.record.creatorId = resolveProps.context.user._id;
            songProps.args.record.strummingPatternId = strummingPatternId;

            return SongTC.getResolver('createOne').resolve(songProps);
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

    const query = {
        songById: SongTC.getResolver('findById'),
        songByIds: SongTC.getResolver('findByIds'),
        songOne: SongTC.getResolver('findOne'),
        songMany: SongTC.getResolver('findMany'),
        songCount: SongTC.getResolver('count'),
        songPagination: SongTC.getResolver('pagination'),
    };

    const authenticated = authMiddleware(options.errors.authorizationError);

    const mutation = {
        songCreateOne: SongTC.getResolver('createNested', [
            authenticated(Role.MODERATOR),
        ]),
        songUpdateById: SongTC.getResolver('updateById', [
            authenticated(Role.MODERATOR),
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
