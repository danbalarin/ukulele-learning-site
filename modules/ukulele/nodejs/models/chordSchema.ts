import { Resolver, ObjectTypeComposer } from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

import { ServerModuleOptions, ServerModuleModel } from '@uls/core-nodejs';
import { authMiddleware } from '@uls/auth-nodejs';
import { Role } from '@uls/auth-common';

import { createChordModel, MODEL_NAME as CHORD_MODEL_NAME } from './chordModel';
import { Schema } from 'mongoose';

export const createChordSchema = (
    options: ServerModuleOptions<ObjectTypeComposer>
) => {
    const ChordModelCreated = createChordModel(options);

    const ChordTC = composeWithMongoose(ChordModelCreated, {});

    ChordTC.setIsTypeOf((obj, context, info) => {
        return obj instanceof ChordModelCreated;
    });

    ChordTC.addResolver({
        name: 'search',
        args: { query: 'String!' },
        type: [ChordTC],
        resolve: async (req: any) => {
            const { query } = req.args;
            const found = await ChordModelCreated.find({
                name: { $regex: query, $options: 'ix' },
            });
            return found;
        },
    });

    const query = {
        chordById: ChordTC.getResolver('findById'),
        chordByIds: ChordTC.getResolver('findByIds'),
        chordOne: ChordTC.getResolver('findOne'),
        chordMany: ChordTC.getResolver('findMany'),
        chordCount: ChordTC.getResolver('count'),
        chordPagination: ChordTC.getResolver('pagination'),
        chordSearch: ChordTC.getResolver('search'),
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

    const model: Omit<
        ServerModuleModel<any, Resolver, ObjectTypeComposer>,
        'seed'
    > & { schema: Schema } = {
        mutation,
        query,
        name: CHORD_MODEL_NAME,
        typeComposer: ChordTC,
        searchQuery: ChordTC.getResolver('search'),
        schema: ChordModelCreated.schema,
    };

    return model;
};
