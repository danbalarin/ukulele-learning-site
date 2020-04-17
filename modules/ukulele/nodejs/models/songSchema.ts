import { Resolver, ObjectTypeComposer } from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

import { ServerModuleOptions, ServerModuleModel } from '@uls/core-nodejs';
import { authMiddleware } from '@uls/auth-nodejs';
import { Role } from '@uls/auth-common';

import { createSongModel, MODEL_NAME as SONG_MODEL_NAME } from './songModel';

export const createSongSchema = (
    options: ServerModuleOptions<ObjectTypeComposer>
) => {
    const SongModelCreated = createSongModel(options);

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
        songCreateOne: SongTC.getResolver('createOne', [
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
