import { HashFunction } from '@uls/core-common'
import { SeedFaker, SeedResult } from '@uls/core-nodejs';
import { User, Role } from '@uls/user-common';

const MODEL = 'User';

/**
 * Creates basic user seed, one admin, one moderator and buch of basic users
 * 
 * @param faker Fake data creator
 * @param hashFn Hash function
 */
export const createUserSeed = (
    faker: SeedFaker,
    hashFn: HashFunction
): SeedResult<User> => {
    const res: User[] = [];

    res.push(
        {
            username: 'admin',
            password: hashFn('123'),
            email: 'admin@test.com',
            role: Role.ADMIN,
        },
        {
            username: 'moderator',
            password: hashFn('123'),
            email: 'moderator@test.com',
            role: Role.MODERATOR,
        }
    );

    for (let i = 0; i < 8; ++i) {
        res.push({
            username: faker.username(),
            email: faker.email(),
            password: hashFn(`pass${i}`),
            role: Role.USER,
        });
    }

    return { model: MODEL, data: res };
};
