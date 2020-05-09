import { Resolver, ObjectTypeComposer } from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

import { ServerModuleOptions, ServerModuleModel } from '@uls/core-nodejs';
import { authMiddleware } from '@uls/auth-nodejs';
import { Role } from '@uls/auth-common';

import {
    createAuthorModel,
    MODEL_NAME as AUTHOR_MODEL_NAME,
    AuthorModel,
} from './authorModel';

export const createAuthorSchema = (
    options: ServerModuleOptions<ObjectTypeComposer>
) => {
    const AuthorModelCreated = createAuthorModel(options);

    const AuthorTC = composeWithMongoose(AuthorModelCreated, {});

    AuthorTC.setIsTypeOf((obj, context, info) => {
        return obj instanceof AuthorModelCreated;
    });

    AuthorTC.addResolver<AuthorModel[]>({
        name: 'search',
        args: { query: 'String!' },
        type: [AuthorTC],
        resolve: async (req: any) => {
            const { query } = req.args;
            const found = await AuthorModelCreated.find({
                name: { $regex: query, $options: 'ix' },
            });
            return found;
        },
    });

    AuthorTC.addRelation('members', {
        resolver: () => AuthorTC.getResolver('findMany'),
        prepareArgs: {
            filter: source => ({ _ids: source.memberIds || [] }),
        },
        projection: { memberIds: true },
    });

    const query = {
        authorById: AuthorTC.getResolver('findById'),
        authorByIds: AuthorTC.getResolver('findByIds'),
        authorOne: AuthorTC.getResolver('findOne'),
        authorMany: AuthorTC.getResolver('findMany'),
        authorCount: AuthorTC.getResolver('count'),
        authorPagination: AuthorTC.getResolver('pagination'),
        authorSearch: AuthorTC.getResolver('search'),
    };

    const authenticated = authMiddleware(options.errors.authorizationError);

    const mutation = {
        authorCreateOne: AuthorTC.getResolver('createOne', [
            authenticated(Role.MODERATOR),
        ]),
        authorUpdateById: AuthorTC.getResolver('updateById', [
            authenticated(Role.MODERATOR),
        ]),
        authorRemoveById: AuthorTC.getResolver('removeById', [
            authenticated(Role.MODERATOR),
        ]),
    };

    const model: Omit<
        ServerModuleModel<any, Resolver, ObjectTypeComposer>,
        'seed'
    > = {
        mutation,
        query,
        name: AUTHOR_MODEL_NAME,
        typeComposer: AuthorTC,
        searchQuery: AuthorTC.getResolver('search'),
    };

    return model;
};
