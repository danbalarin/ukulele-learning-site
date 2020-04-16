import { composeWithMongoose } from 'graphql-compose-mongoose';

import {
    ServerModuleOptions,
    ServerModuleModel,
    SearchGroup,
} from '@uls/core-nodejs';
import { authMiddleware } from '@uls/auth-nodejs';
import { Role } from '@uls/auth-common';

import {
    createAuthorModel,
    MODEL_NAME as AUTHOR_MODEL_NAME,
    AuthorModel,
} from './authorModel';

export const createAuthorSchema = (options: ServerModuleOptions) => {
    const AuthorModelCreated = createAuthorModel(options);

    const AuthorTC = composeWithMongoose(AuthorModelCreated, {});

    AuthorTC.addResolver<AuthorModel[]>({
        name: 'search',
        args: { query: 'String!' },
        type: [SearchGroup],
        resolve: async (req: any) => {
            const { query } = req.args;
            const found = await AuthorModelCreated.find({
                name: { $regex: query, $options: 'ix' },
            });
            const result = found.map(author => ({
                label: author.name,
                value: author.name,
            }));
            return { label: AUTHOR_MODEL_NAME, options: result };
        },
    });

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
        searchQuery: AuthorTC.getResolver('search'),
    };

    return model;
};
