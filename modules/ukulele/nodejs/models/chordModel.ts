import { Document, Schema, model } from 'mongoose';

import { ServerModuleOptions } from '@uls/core-nodejs';
import { Chord } from '@uls/ukulele-common';

export interface ChordModel extends Chord, Document {}

export const MODEL_NAME = 'Chord';

export const createChordModel = (options: ServerModuleOptions) => {
    const ChordSchema = new Schema<ChordModel>({
        name: {
            type: String,
            required: true,
            unique: true,
        },
        strings: {
            type: [],
            required: true,
        },
    });

    return model<ChordModel>(MODEL_NAME, ChordSchema);
};
