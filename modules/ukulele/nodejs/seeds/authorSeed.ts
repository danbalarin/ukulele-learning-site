import { EntityID } from '@uls/core-common';
import { ServerModuleOptions, ServerModuleModel } from '@uls/core-nodejs';

import { Author } from '@uls/ukulele-common';
import { Types } from 'mongoose';

/**
 * Seeds {@link Author} model in database
 *
 * @param options
 */
export const createAuthorSeed = (
    options: ServerModuleOptions
): Pick<ServerModuleModel, 'seed'> => {
    const authors: (Author & EntityID<Types.ObjectId>)[] = [
        { name: 'Various Artists' },
        { name: 'Vance Joy' },
        { name: 'Tyler Joseph' },
        { name: 'Josh Dun' },
    ];

    return { seed: authors };
};
