import { ServerModuleOptions, ServerModuleModel } from '@uls/core-nodejs';

import { MetronomePreset } from '@uls/ukulele-common';

/**
 * Seeds {@link MetronomePreset} model
 *
 * @param options
 */
export const createMetronomePresetSeed = (
    options: ServerModuleOptions
): Pick<ServerModuleModel, 'seed'> => {
    const presets: MetronomePreset[] = [
        { tempo: 100 },
        { tempo: 120 },
        { tempo: 140 },
    ];

    return { seed: presets };
};
