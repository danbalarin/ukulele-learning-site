import { ObjectTypeComposer } from 'graphql-compose';
import { Document, Schema, model } from 'mongoose';

import { ServerModuleOptions } from '@uls/core-nodejs';
import { ChordProgression } from '@uls/ukulele-common';

import { MODEL_NAME as CHORD_MODEL_NAME } from './chordModel';
import { MODEL_NAME as STRUMMING_PATTERN_MODEL_NAME } from './strummingPatternModel';

export interface ChordProgressionModel extends ChordProgression<any>, Document {
    wasCreatedByUser: (userId: Schema.Types.ObjectId) => boolean;
}

export const MODEL_NAME = 'ChordProgression';

export const createChordProgressionModel = (
    options: ServerModuleOptions<ObjectTypeComposer>
) => {
    const ChordProgressionSchema = new Schema<ChordProgressionModel>({
        name: {
            type: String,
            required: true,
        },
        chords: {
            type: [Schema.Types.ObjectId],
            ref: CHORD_MODEL_NAME,
            required: true,
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: options.creatorModel?.getTypeName(),
            required: true,
        },
        strummingPattern: {
            type: Schema.Types.ObjectId,
            ref: STRUMMING_PATTERN_MODEL_NAME,
        },
    });

    ChordProgressionSchema.method('wasCreatedByUser', function(
        this: ChordProgressionModel,
        userId: Schema.Types.ObjectId
    ) {
        return this.creator === userId;
    });

    return model<ChordProgressionModel>(MODEL_NAME, ChordProgressionSchema);
};
