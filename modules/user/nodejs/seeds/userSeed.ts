import { ServerModuleOptions, ServerModuleModel } from '@uls/core-nodejs';
import { Role } from '@uls/auth-common';
import { User } from '@uls/user-common';

/**
 * Creates basic user seed, one admin, one moderator and buch of basic users
 *
 * @param options
 */
export const createUserSeed = (
    options: ServerModuleOptions
): Pick<ServerModuleModel, 'seed'> => {
    const res: User[] = [];

    res.push(
        {
            username: 'admin',
            password: options.hashFunction('123'),
            email: 'admin@test.com',
            role: Role.ADMIN,
        },
        {
            username: 'moderator',
            password: options.hashFunction('123'),
            email: 'moderator@test.com',
            role: Role.MODERATOR,
        },
        {
            username: 'user',
            password: options.hashFunction('123'),
            email: 'user@test.com',
            role: Role.USER,
        }
    );

    for (let i = 0; i < 7; ++i) {
        res.push({
            username: options.seedFaker.username(),
            email: options.seedFaker.email(),
            password: options.hashFunction(`pass${i}`),
            role: Role.USER,
        });
    }

    return { seed: res };
};
