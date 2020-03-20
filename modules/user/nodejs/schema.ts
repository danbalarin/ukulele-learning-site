import { composeWithMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';

import { HashFunction, TokenCreator } from '@uls/core-common';
import { ResolverErrors } from '@uls/core-nodejs';
import { Role, UserInteractor } from '@uls/user-common';

import { authMiddleware } from './auth';
import { createUserModel, UserModel } from './models/userModel';
import { Model } from 'mongoose';

/**
 * Creates user graphql schema
 * 
 * @param hashFn Hash function
 * @param param1 {@link ResolverErrors} errors to be thrown in specific cases 
 * @param tokenCreator Function that creates token from object or stringified object
 */
export const createSchema = (
    hashFn: HashFunction,
    { authErr, inputErr }: ResolverErrors,
    tokenCreator: TokenCreator
) => {
    const UserModel = createUserModel(hashFn);

    const customizationOptions = {};

    const UserTC = composeWithMongoose(UserModel, customizationOptions);

    UserTC.addResolver({
        name: 'login',
        args: { username: 'String!', password: 'String!' },
        type: `type LoginResponse { token: String! }`,
        resolve: async (req: any) => {
            const { username, password } = req.args;
            const user = await UserModel.findOne({ username });
            if (!user || !user.passwordConfirm(password)) {
                throw new authErr('Invalid credentials');
            }
            const userInteractor = new UserInteractor(user.toObject());
            const token = tokenCreator(userInteractor.stripUser());
            req.context.token = token;
            return { token };
        },
    });

    const validateUnique = async (
        fields: { [key: string]: string }[],
        model: Model<any>
    ): Promise<void> => {
        const errors: string[] = [];
        for (const i in fields) {
            const field = fields[i];
            const match = await model.find(field);
            if (match.length) {
                errors.push(Object.keys(field)[0]);
            }
        }

        if (errors.length) {
            throw new inputErr('Form validation error', {
                invalidArgs: errors,
            });
        }
    };

    UserTC.addResolver({
        name: 'signup',
        args: { username: 'String!', email: 'String!', password: 'String!' },
        type: UserTC,
        resolve: async (req: any) => {
            const { username, password, email } = req.args;

            await validateUnique([{ username }, { email }], UserModel);

            const user = await UserModel.create({ username, password, email });
            if (!user) {
                throw new Error('Something went wrong');
            }
            const userInteractor = new UserInteractor(user.toObject());
            return userInteractor.stripUser();
        },
    });

    UserTC.addResolver<UserModel>({
        name: 'me',
        type: UserTC,
        resolve: async (req: any) => {
            const id = req.context.user._id;
            const user = await UserModel.findById(id);
            return user;
        },
    });

    UserTC.removeField('password');

    schemaComposer.Query.addFields({
        me: UserTC.getResolver('me', [authMiddleware(Role.USER, authErr)]),
        userById: UserTC.getResolver('findById', [
            authMiddleware(Role.ADMIN, authErr),
        ]),
        userByIds: UserTC.getResolver('findByIds', [
            authMiddleware(Role.ADMIN, authErr),
        ]),
        userOne: UserTC.getResolver('findOne', [
            authMiddleware(Role.ADMIN, authErr),
        ]),
        userMany: UserTC.getResolver('findMany', [
            authMiddleware(Role.ADMIN, authErr),
        ]),
        userCount: UserTC.getResolver('count', [
            authMiddleware(Role.ADMIN, authErr),
        ]),
        // userConnection: UserTC.getResolver('connection'),
        userPagination: UserTC.getResolver('pagination', [
            authMiddleware(Role.ADMIN, authErr),
        ]),
    });

    schemaComposer.Mutation.addFields({
        signup: UserTC.getResolver('signup'),

        // userCreateMany: UserTC.getResolver('createMany'),
        userUpdateById: UserTC.getResolver('updateById', [
            authMiddleware(Role.ADMIN, authErr),
        ]),
        // userUpdateOne: UserTC.getResolver('updateOne'),
        // userUpdateMany: UserTC.getResolver('updateMany'),
        // userRemoveById: UserTC.getResolver('removeById'),
        // userRemoveOne: UserTC.getResolver('removeOne'),
        // userRemoveMany: UserTC.getResolver('removeMany'),
        login: UserTC.getResolver('login'),
    });

    return schemaComposer.buildSchema();
};
