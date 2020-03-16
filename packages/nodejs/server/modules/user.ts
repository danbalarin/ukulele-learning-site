import { AuthenticationError, UserInputError } from 'apollo-server';
import faker from 'faker';

import { userModule } from '@uls/user-nodejs';
import { hashFn, tokenCreator } from '../utils';

class CustomFaker {
    username = () => faker.internet.userName();
    password = () => faker.internet.password();
    email = () => faker.internet.email();
    number = () => faker.random.number();
}

export const UserSchema = userModule.createSchema(
    hashFn,
    {
        authErr: AuthenticationError,
        inputErr: UserInputError,
    },
    tokenCreator
);
export const UserSeed = userModule.createSeed(new CustomFaker(), hashFn);
