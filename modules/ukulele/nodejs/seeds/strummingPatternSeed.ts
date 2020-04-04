import { ServerModuleOptions, ServerModuleModel } from '@uls/core-nodejs';

import { StrummingPattern, Strum } from '@uls/ukulele-common';

/** Shortcuts */
const D = Strum.D;
const T = Strum.T;
const H = Strum['-'];
const U = Strum.U;

/**
 * Seeds {@link StrummingPattern} model
 *
 * @param options
 */
export const createStrummingPatternSeed = (
    options: ServerModuleOptions
): Pick<ServerModuleModel, 'seed'> => {
    const presets: StrummingPattern[] = [
        {
            pattern: [D, H, D, H, H, U, D, U],
        },
        {
            pattern: [D, H, D, H, D, H, D, H],
        },
        {
            pattern: [D, U, D, U, D, U, D, U],
        },
    ];

    return { seed: presets };
};
