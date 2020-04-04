import { ServerModuleOptions, ServerModuleModel } from '@uls/core-nodejs';

import { Author } from '@uls/ukulele-common';

/**
 * Seeds {@link Author} model in database
 *
 * @param options
 */
export const createAuthorSeed = (
    options: ServerModuleOptions
): Pick<ServerModuleModel, 'seed'> => {
    const authors: Author[] = [];

    return { seed: authors };
};
