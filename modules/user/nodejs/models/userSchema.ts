import {
    Resolver,
    ObjectTypeComposer,
    ResolverResolveParams,
} from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

import {
    ServerModuleOptions,
    ServerModuleModel,
    validateUnique,
} from '@uls/core-nodejs';
import { UserInteractor } from '@uls/user-common';

import { authMiddleware } from '@uls/auth-nodejs';
import { Role } from '@uls/auth-common';
import {
    createUserModel,
    UserModel,
    MODEL_NAME as USER_MODEL_NAME,
} from './userModel';
import { isMe } from '../utils';

/**
 * Creates user graphql schema
 *
 * @param options
 */
export const createUserSchema = (options: ServerModuleOptions) => {
    const UserModelCreated = createUserModel(options);

    const customizationOptions = {};

    const UserTC = composeWithMongoose(UserModelCreated, customizationOptions);

    // !important here is side effect, adding TypeComposer to options
    options.creatorModel = UserTC;

    UserTC.setIsTypeOf((obj, context, info) => {
        return obj instanceof UserModelCreated;
    });

    UserTC.addResolver({
        name: 'login',
        args: { username: 'String!', password: 'String!' },
        type: `type TokenResponse { token: String! }`,
        resolve: async (req: any) => {
            const { username, password } = req.args;
            const user = await UserModelCreated.findOne({ username });
            if (!user || !user.passwordConfirm(password)) {
                throw new options.errors.authorizationError(
                    'Invalid credentials'
                );
            }
            const userInteractor = new UserInteractor(user.toObject());
            const token = options.tokenCreator(userInteractor.stripUser());
            req.context.token = token;
            return { token };
        },
    });

    UserTC.addResolver({
        name: 'signup',
        args: { username: 'String!', email: 'String!', password: 'String!' },
        type: `type TokenResponse { token: String! }`,
        resolve: async (req: any) => {
            const { username, password, email } = req.args;

            await validateUnique(options.errors.inputError)(
                [{ username }, { email }],
                UserModelCreated
            );

            const user = await UserModelCreated.create({
                username,
                password,
                email,
            });
            if (!user) {
                throw new Error('Something went wrong');
            }
            const userInteractor = new UserInteractor(user.toObject());
            const token = options.tokenCreator(userInteractor.stripUser());
            req.context.token = token;
            return { token };
        },
    });

    UserTC.addResolver<UserModel>({
        name: 'me',
        type: UserTC,
        resolve: async (req: any) => {
            const id = req.context.user._id;
            const user = await UserModelCreated.findById(id);
            return user;
        },
    });

    UserTC.addResolver<UserModel>({
        name: 'updateMe',
        args: { record: UserTC.getITC().removeField('_id') },
        type: UserTC,
        resolve: async (req: ResolverResolveParams<any, any>) => {
            const id = req.context.user._id;
            await UserModelCreated.findOneAndUpdate(
                { _id: id },
                req.args.record
            );
            const user = await UserModelCreated.findOne({ _id: id });
            return user;
        },
    });

    UserTC.addResolver({
        name: 'search',
        args: { query: 'String!' },
        type: [UserTC],
        resolve: async (req: any) => {
            const { query } = req.args;
            const found = await UserModelCreated.find({
                username: { $regex: query, $options: 'i' },
            });
            return found;
        },
    });

    UserTC.removeField('password');

    const authenticated = authMiddleware(options.errors.authorizationError);

    const userMe = isMe(options.errors.authorizationError, UserModelCreated);

    const query = {
        me: UserTC.getResolver('me', [authenticated(Role.USER)]),
        userById: UserTC.getResolver('findById', [authenticated(Role.ADMIN)]),
        userByIds: UserTC.getResolver('findByIds', [authenticated(Role.ADMIN)]),
        userOne: UserTC.getResolver('findOne', [authenticated(Role.ADMIN)]),
        userMany: UserTC.getResolver('findMany', [authenticated(Role.ADMIN)]),
        userCount: UserTC.getResolver('count', [authenticated(Role.ADMIN)]),
        userPagination: UserTC.getResolver('pagination', [
            authenticated(Role.ADMIN),
        ]),
    };

    const mutation = {
        signup: UserTC.getResolver('signup'),
        userUpdateMe: UserTC.getResolver('updateMe', [
            authenticated(Role.USER),
        ]),
        userUpdateById: UserTC.getResolver('updateById', [
            authenticated(Role.ADMIN),
        ]),
        login: UserTC.getResolver('login'),
    };

    const searchQuery = UserTC.getResolver('search', [
        authenticated(Role.ADMIN),
    ]);

    const model: Omit<
        ServerModuleModel<any, Resolver, ObjectTypeComposer>,
        'seed'
    > = {
        mutation,
        query,
        name: USER_MODEL_NAME,
        typeComposer: UserTC,
        searchQuery: searchQuery,
    };

    return model;
};
