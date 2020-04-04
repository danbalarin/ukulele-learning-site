import { model } from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose';

import { ServerModuleOptions, ServerModuleModel } from '@uls/core-nodejs';
import { authMiddleware } from '@uls/auth-nodejs';
import { Role } from '@uls/auth-common';

import { createSongModel, MODEL_NAME as SONG_MODEL_NAME } from './songModel';

export const createSongSchema = (options: ServerModuleOptions) => {
    const SongModel = createSongModel(options);

    const SongTC = composeWithMongoose(SongModel, {});

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
