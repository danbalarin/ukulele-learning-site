import { composeWithMongoose } from 'graphql-compose-mongoose';

import {
    ServerModuleOptions,
    ServerModuleModel,
    SearchGroup,
} from '@uls/core-nodejs';
import { authMiddleware } from '@uls/auth-nodejs';
import { Role } from '@uls/auth-common';

import {
    createChordModel,
    MODEL_NAME as CHORD_MODEL_NAME,
    ChordModel,
} from './chordModel';

export const createChordSchema = (options: ServerModuleOptions) => {
    const ChordModelCreated = createChordModel(options);

    const ChordTC = composeWithMongoose(ChordModelCreated, {});

    ChordTC.addResolver({
        name: 'search',
        args: { query: 'String!' },
        type: [SearchGroup],
        resolve: async (req: any) => {
            const { query } = req.args;
            const found = await ChordModelCreated.find({
                name: { $regex: query, $options: 'ix' },
            });
            const result = found.map(chord => ({
                label: chord.name,
                value: chord.name,
            }));
            return { label: CHORD_MODEL_NAME, options: result };
        },
    });

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
        searchQuery: ChordTC.getResolver('search'),
    };

    return model;
};
