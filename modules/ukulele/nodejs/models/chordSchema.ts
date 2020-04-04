import { composeWithMongoose } from 'graphql-compose-mongoose';

import { ServerModuleOptions, ServerModuleModel } from '@uls/core-nodejs';
import { authMiddleware } from '@uls/auth-nodejs';
import { Role } from '@uls/auth-common';

import { createChordModel, MODEL_NAME as CHORD_MODEL_NAME } from './chordModel';

export const createChordSchema = (options: ServerModuleOptions) => {
    const ChordModel = createChordModel(options);

    const ChordTC = composeWithMongoose(ChordModel, {});

    const query = {
        chordById: ChordTC.getResolver('findById'),
        chordByIds: ChordTC.getResolver('findByIds'),
        chordOne: ChordTC.getResolver('findOne'),
        chordMany: ChordTC.getResolver('findMany'),
        chordCount: ChordTC.getResolver('count'),
        chordPagination: ChordTC.getResolver('pagination'),
    };

    const authenticated = authMiddleware(options.errors.authorizationError);

    const mutation = {
        chordCreateOne: ChordTC.getResolver('createOne', [
            authenticated(Role.MODERATOR),
        ]),
        chordUpdateById: ChordTC.getResolver('updateById', [
            authenticated(Role.MODERATOR),
        ]),
    };

    const model: Omit<ServerModuleModel, 'seed'> = {
        mutation,
        query,
        name: CHORD_MODEL_NAME,
    };

    return model;
};
