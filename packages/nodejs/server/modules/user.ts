import { AuthenticationError, UserInputError } from 'apollo-server';

import { userModule } from '@uls/user-nodejs';
import { hashFn, tokenCreator, Faker } from '../src/utils';
import { ServerModuleOptions } from '@uls/core-nodejs';

const options: ServerModuleOptions = {
    errors: {
        inputError: UserInputError,
        authorizationError: AuthenticationError,
    },
    hashFunction: hashFn,
    tokenCreator,
    seedFaker: new Faker(),
};

const User = userModule.init(options);

export { User };
