import { composeWithMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';

import { createUserModel } from './models/userModel';

export const createSchema = (hashFn: (text: string) => Promise<string>) => {
    const UserModel = createUserModel(hashFn);

    const customizationOptions = {};

    const UserTC = composeWithMongoose(UserModel, customizationOptions);

    // UserTC.getResolvers().forEach((val, key) => console.log(key));
    // console.error();

    schemaComposer.Query.addFields({
        userById: UserTC.getResolver('findById'),
        userByIds: UserTC.getResolver('findByIds'),
        userOne: UserTC.getResolver('findOne'),
        userMany: UserTC.getResolver('findMany'),
        userCount: UserTC.getResolver('count'),
        userConnection: UserTC.getResolver('connection'),
        userPagination: UserTC.getResolver('pagination'),
    });

    schemaComposer.Mutation.addFields({
        userCreateOne: UserTC.getResolver('createOne'),
        userCreateMany: UserTC.getResolver('createMany'),
        userUpdateById: UserTC.getResolver('updateById'),
        userUpdateOne: UserTC.getResolver('updateOne'),
        userUpdateMany: UserTC.getResolver('updateMany'),
        userRemoveById: UserTC.getResolver('removeById'),
        userRemoveOne: UserTC.getResolver('removeOne'),
        userRemoveMany: UserTC.getResolver('removeMany'),
    });

    return schemaComposer.buildSchema();
};
