import {
    ServerModule,
    ServerModuleResponse,
    ServerModuleOptions,
} from '@uls/core-nodejs';

import { createModels } from './models';

const init = (options: ServerModuleOptions) => {
    const models = createModels(options);

    const res: ServerModuleResponse = {
        models,
    };

    return res;
};

/**
 * Provides user and authentication related NodeJS parts of application.
 */
export const userModule: ServerModule = {
    init,
};
