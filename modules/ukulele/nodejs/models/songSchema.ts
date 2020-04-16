import { composeWithMongoose } from 'graphql-compose-mongoose';

import {
    ServerModuleOptions,
    ServerModuleModel,
    SearchGroup,
} from '@uls/core-nodejs';
import { authMiddleware } from '@uls/auth-nodejs';
import { Role } from '@uls/auth-common';

import { createSongModel, MODEL_NAME as SONG_MODEL_NAME } from './songModel';

export const createSongSchema = (options: ServerModuleOptions) => {
    const SongModelCreated = createSongModel(options);

    const SongTC = composeWithMongoose(SongModelCreated, {});

    SongTC.addResolver({
        name: 'search',
        args: { query: 'String!' },
        type: [SearchGroup],
        resolve: async (req: any) => {
            const { query } = req.args;
            const found = await SongModelCreated.find({
                name: { $regex: query, $options: 'ix' },
            });
            const result = found.map(song => ({
                label: song.title,
                value: song.title,
            }));
            return { label: SONG_MODEL_NAME, options: result };
        },
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

    // const UserModel = model(options.creatorModel)
    // UserModel

    const songModel: Omit<ServerModuleModel, 'seed'> = {
        mutation,
        query,
        name: SONG_MODEL_NAME,
    };

    return songModel;
};
