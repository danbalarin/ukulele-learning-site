import { ObjectTypeComposer } from 'graphql-compose';
import { Document, Schema, model } from 'mongoose';

import { ServerModuleOptions } from '@uls/core-nodejs';
import { StrummingPattern, Strum } from '@uls/ukulele-common';

import { MODEL_NAME as METRONOME_PRESET_MODEL_NAME } from './metronomePresetModel';

export interface StrummingPatternModel extends StrummingPattern, Document {}

export const MODEL_NAME = 'StrummingPattern';

export const createStrummingPatternModel = (
    options: ServerModuleOptions<ObjectTypeComposer>
) => {
    const StrummingPatternSchema = new Schema<StrummingPatternModel>({
        pattern: {
            type: [Number],
            enum: [Strum.D, Strum.T, Strum.U, Strum['-']],
            required: true,
        },
        metronomePreset: {
            type: Schema.Types.ObjectId,
            ref: METRONOME_PRESET_MODEL_NAME,
        },
    });

    return model<StrummingPatternModel>(MODEL_NAME, StrummingPatternSchema);
};
