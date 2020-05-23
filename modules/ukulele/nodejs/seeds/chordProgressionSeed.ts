import { ServerModuleOptions, ServerModuleModel } from '@uls/core-nodejs';

import { ChordProgression } from '@uls/ukulele-common';

/**
 * Seeds {@link ChordProgression} model
 *
 * @param options
 */
export const createChordProgressionSeed = (
    options: ServerModuleOptions
): Pick<ServerModuleModel, 'seed'> => {
    const chordProgressions: ChordProgression<any>[] = [];

    return { seed: chordProgressions };
};
