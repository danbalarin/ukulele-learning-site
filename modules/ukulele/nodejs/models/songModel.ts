import { ObjectTypeComposer } from 'graphql-compose';
import { Document, Schema, model } from 'mongoose';

import { ServerModuleOptions } from '@uls/core-nodejs';
import { Song } from '@uls/ukulele-common';

import { MODEL_NAME as CHORD_MODEL_NAME } from './chordModel';
import { MODEL_NAME as STRUMMING_PATTERN_MODEL_NAME } from './strummingPatternModel';
import { MODEL_NAME as AUTHOR_MODEL_NAME } from './authorModel';

export interface SongModel extends Song<any>, Document {
    creatorId: Schema.Types.ObjectId;
}

export const MODEL_NAME = 'Song';

export const createSongModel = (
    options: ServerModuleOptions<ObjectTypeComposer>
) => {
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
        chordsIds: {
            type: [Schema.Types.ObjectId],
            ref: CHORD_MODEL_NAME,
        },
        strummingPatternId: {
            type: Schema.Types.ObjectId,
            ref: STRUMMING_PATTERN_MODEL_NAME,
        },
        creatorId: {
            type: Schema.Types.ObjectId,
            ref: options.creatorModel?.getTypeName(),
        },
        authorId: {
            type: Schema.Types.ObjectId,
            ref: AUTHOR_MODEL_NAME,
        },
    });

    return model<SongModel>(MODEL_NAME, SongSchema);
};
