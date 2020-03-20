import { GraphQLSchema } from 'graphql';

import { ServerModule } from '@uls/core-nodejs';
import { User } from '@uls/user-common';

import { createSchema } from './schema';
import { createUserSeed } from './seeds/userSeed';

/**
 * Provides user and authentication related NodeJS parts of application.
 */
export const userModule: ServerModule<User, GraphQLSchema> = {
    createSeed: createUserSeed,
    createSchema: createSchema,
};
