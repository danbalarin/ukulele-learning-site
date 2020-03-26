import { AuthenticationError, UserInputError } from 'apollo-server';

import { userModule } from '@uls/user-nodejs';
import { hashFn, tokenCreator, Faker } from '../src/utils';

export const UserSchema = userModule.createSchema(
    hashFn,
    {
        authErr: AuthenticationError,
        inputErr: UserInputError,
    },
    tokenCreator
);
export const UserSeed = userModule.createSeed(new Faker(), hashFn);
