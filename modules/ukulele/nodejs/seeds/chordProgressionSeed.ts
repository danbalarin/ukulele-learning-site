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
    const chordProgressions: ChordProgression<any>[] = [
        { name: 'asd', chords: [], creator: '5e80b6609155a5708cb4a2cc' },
    ];

    return { seed: chordProgressions };
};
