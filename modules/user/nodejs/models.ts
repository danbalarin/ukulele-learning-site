import { ServerModuleOptions, ServerModuleModel } from '@uls/core-nodejs';

import { createUserSchema } from './models/userSchema';
import { createUserSeed } from './seeds/userSeed';

export const createModels = (
    options: ServerModuleOptions
): ServerModuleModel[] => {
    const userModel = createUserSchema(options);
    const userSeed = createUserSeed(options);

    return [{ ...userModel, ...userSeed }];
};
