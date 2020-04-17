import { Resolver, ObjectTypeComposer } from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

import { ServerModuleOptions, ServerModuleModel } from '@uls/core-nodejs';
import { authMiddleware } from '@uls/auth-nodejs';
import { Role } from '@uls/auth-common';

import {
    createStrummingPatternModel,
    MODEL_NAME as STRUMMING_PATTERN_MODEL_NAME,
} from './strummingPatternModel';

export const createStrummingPatternSchema = (
    options: ServerModuleOptions<ObjectTypeComposer>
) => {
    const StrummingPatternModel = createStrummingPatternModel(options);

    const StrummingPatternTC = composeWithMongoose(StrummingPatternModel, {});

    const query = {
        strummingPatternById: StrummingPatternTC.getResolver('findById'),
        strummingPatternByIds: StrummingPatternTC.getResolver('findByIds'),
        strummingPatternOne: StrummingPatternTC.getResolver('findOne'),
        strummingPatternMany: StrummingPatternTC.getResolver('findMany'),
        strummingPatternCount: StrummingPatternTC.getResolver('count'),
        strummingPatternPagination: StrummingPatternTC.getResolver(
            'pagination'
        ),
    };

    const authenticated = authMiddleware(options.errors.authorizationError);

    const mutation = {
        strummingPatternCreateOne: StrummingPatternTC.getResolver('createOne', [
            authenticated(Role.MODERATOR),
        ]),
        strummingPatternUpdateById: StrummingPatternTC.getResolver(
            'updateById',
            [authenticated(Role.MODERATOR)]
        ),
    };

    const model: Omit<
        ServerModuleModel<any, Resolver, ObjectTypeComposer>,
        'seed'
    > = {
        mutation,
        query,
        name: STRUMMING_PATTERN_MODEL_NAME,
        typeComposer: StrummingPatternTC,
    };

    return model;
};
