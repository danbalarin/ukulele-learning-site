import { ForbiddenError, UserInputError } from 'apollo-server';

import { hashFn, tokenCreator, Faker } from '../src/utils';
import { ServerModuleOptions } from '@uls/core-nodejs';

export const options: ServerModuleOptions = {
    errors: {
        inputError: UserInputError,
        authorizationError: ForbiddenError,
    },
    hashFunction: hashFn,
    tokenCreator,
    seedFaker: new Faker(),
    creatorModel: 'User',
};
