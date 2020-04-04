import { composeWithMongoose } from 'graphql-compose-mongoose';

import { ServerModuleOptions, ServerModuleModel } from '@uls/core-nodejs';
import { authMiddleware } from '@uls/auth-nodejs';
import { Role } from '@uls/auth-common';

import {
    createChordProgressionModel,
    MODEL_NAME as CHORDPROGRESSION_MODEL_NAME,
} from './chordProgressionModel';
import { creator } from '../utils';

export const createChordProgressionSchema = (options: ServerModuleOptions) => {
    const ChordProgressionModel = createChordProgressionModel(options);

    const ChordProgressionTC = composeWithMongoose(ChordProgressionModel, {});

    const query = {
        chordProgressionById: ChordProgressionTC.getResolver('findById'),
        chordProgressionByIds: ChordProgressionTC.getResolver('findByIds'),
        chordProgressionOne: ChordProgressionTC.getResolver('findOne'),
        chordProgressionMany: ChordProgressionTC.getResolver('findMany'),
        chordProgressionCount: ChordProgressionTC.getResolver('count'),
        chordProgressionPagination: ChordProgressionTC.getResolver(
            'pagination'
        ),
    };

    const authenticated = authMiddleware(options.errors.authorizationError);
    const chordProgressionCreator = creator(
        options.errors.authorizationError,
        ChordProgressionModel
    );

    const mutation = {
        chordProgressionCreateOne: ChordProgressionTC.getResolver('createOne', [
            authenticated(Role.USER),
        ]),
        chordProgressionUpdateById: ChordProgressionTC.getResolver(
            'updateById',
            [chordProgressionCreator]
        ),
        chordProgressionUpdateByIdModerator: ChordProgressionTC.getResolver(
            'updateById',
            [authenticated(Role.MODERATOR)]
        ),
    };

    const model: Omit<ServerModuleModel, 'seed'> = {
        mutation,
        query,
        name: CHORDPROGRESSION_MODEL_NAME,
    };

    return model;
};
