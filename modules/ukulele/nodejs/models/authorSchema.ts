import { composeWithMongoose } from 'graphql-compose-mongoose';

import { ServerModuleOptions, ServerModuleModel } from '@uls/core-nodejs';
import { authMiddleware } from '@uls/auth-nodejs';
import { Role } from '@uls/auth-common';

import {
    createAuthorModel,
    MODEL_NAME as AUTHOR_MODEL_NAME,
} from './authorModel';

export const createAuthorSchema = (options: ServerModuleOptions) => {
    const ChordModel = createAuthorModel(options);

    const AuthorTC = composeWithMongoose(ChordModel, {});

    const query = {
        authorById: AuthorTC.getResolver('findById'),
        authorByIds: AuthorTC.getResolver('findByIds'),
        authorOne: AuthorTC.getResolver('findOne'),
        authorMany: AuthorTC.getResolver('findMany'),
        authorCount: AuthorTC.getResolver('count'),
        authorPagination: AuthorTC.getResolver('pagination'),
    };

    const authenticated = authMiddleware(options.errors.authorizationError);

    const mutation = {
        authorCreateOne: AuthorTC.getResolver('createOne', [
            authenticated(Role.MODERATOR),
        ]),
        authorUpdateById: AuthorTC.getResolver('updateById', [
            authenticated(Role.MODERATOR),
        ]),
    };

    const model: Omit<ServerModuleModel, 'seed'> = {
        mutation,
        query,
        name: AUTHOR_MODEL_NAME,
    };

    return model;
};
