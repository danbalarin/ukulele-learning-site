import { ObjectTypeComposer } from 'graphql-compose';
import { ForbiddenError, UserInputError } from 'apollo-server';

import { hashFn, tokenCreator, Faker } from '../src/utils';
import { ServerModuleOptions } from '@uls/core-nodejs';

export const options: ServerModuleOptions<ObjectTypeComposer> = {
    errors: {
        inputError: UserInputError,
        authorizationError: ForbiddenError,
    },
    hashFunction: hashFn,
    tokenCreator,
    seedFaker: new Faker(),
};
