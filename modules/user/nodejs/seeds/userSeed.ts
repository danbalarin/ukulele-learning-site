import {
    ServerModuleOptions,
    ServerModuleModel,
    SeedContext,
} from '@uls/core-nodejs';
import { Role } from '@uls/auth-common';
import { User } from '@uls/user-common';
import { EntityID } from '@uls/core-common';
import { Types } from 'mongoose';

/**
 * Creates basic user seed, one admin, one moderator and buch of basic users
 *
 * @param options
 */
export const createUserSeed = (
    options: ServerModuleOptions
): Pick<ServerModuleModel, 'seed'> => {
    const res: (User & EntityID<Types.ObjectId>)[] = [];

    const adminId = Types.ObjectId();
    const moderatorId = Types.ObjectId();
    const userId = Types.ObjectId();

    // context.user = {
    //     admin: adminId,
    //     moderator: moderatorId,
    //     user: userId,
    // };

    res.push(
        {
            username: 'admin',
            password: options.hashFunction('123'),
            email: 'admin@test.com',
            role: Role.ADMIN,
            _id: adminId,
        },
        {
            username: 'moderator',
            password: options.hashFunction('123'),
            email: 'moderator@test.com',
            role: Role.MODERATOR,
            _id: moderatorId,
        },
        {
            username: 'user',
            password: options.hashFunction('123'),
            email: 'user@test.com',
            role: Role.USER,
            _id: userId,
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
