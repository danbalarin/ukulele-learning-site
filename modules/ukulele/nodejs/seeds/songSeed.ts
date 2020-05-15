import { EntityID } from '@uls/core-common';
import { ServerModuleOptions, ServerModuleModel } from '@uls/core-nodejs';

import { Song } from '@uls/ukulele-common';
import { Types } from 'mongoose';

/**
 * Seeds {@link Song} model in database
 *
 * @param options
 */
export const createSongSeed = (
    options: ServerModuleOptions
): Pick<ServerModuleModel, 'seed'> => {
    const authors: (Song<any> & EntityID<Types.ObjectId>)[] = [
        { title: 'Heathens', creator: 'admin', chords: [], lyrics: [] },
    ];

    return { seed: authors };
};
