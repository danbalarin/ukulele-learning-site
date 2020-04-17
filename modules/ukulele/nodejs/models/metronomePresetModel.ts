import { ObjectTypeComposer } from 'graphql-compose';
import { Document, Schema, model } from 'mongoose';

import { ServerModuleOptions } from '@uls/core-nodejs';
import { MetronomePreset } from '@uls/ukulele-common';

export interface MetronomePresetModel extends MetronomePreset, Document {}

export const MODEL_NAME = 'MetronomePreset';

export const createMetronomePresetModel = (
    options: ServerModuleOptions<ObjectTypeComposer>
) => {
    const MetronomePresetSchema = new Schema<MetronomePresetModel>({
        tempo: {
            type: Number,
            required: true,
            unique: true,
        },
    });

    return model<MetronomePresetModel>(MODEL_NAME, MetronomePresetSchema);
};
