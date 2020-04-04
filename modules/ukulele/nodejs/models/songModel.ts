import { Document, Schema, model } from 'mongoose';

import { ServerModuleOptions } from '@uls/core-nodejs';
import { Song } from '@uls/ukulele-common';

import { MODEL_NAME as CHORD_MODEL_NAME } from './chordModel';
import { MODEL_NAME as STRUMMING_PATTERN_MODEL_NAME } from './strummingPatternModel';

export interface SongModel extends Song<any>, Document {}

export const MODEL_NAME = 'Song';

export const createSongModel = (options: ServerModuleOptions) => {
    const SongSchema = new Schema<SongModel>({
        title: {
            type: String,
            required: true,
            unique: true,
        },
        lyrics: {
            type: String,
            required: true,
        },
        chords: {
            type: [Schema.Types.ObjectId],
            ref: CHORD_MODEL_NAME,
        },
        strummingPattern: {
            type: Schema.Types.ObjectId,
            ref: STRUMMING_PATTERN_MODEL_NAME,
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: options.creatorModel,
        },
    });

    return model<SongModel>(MODEL_NAME, SongSchema);
};
