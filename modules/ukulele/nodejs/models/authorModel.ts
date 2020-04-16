import { Document, Schema, model } from 'mongoose';

import { ServerModuleOptions } from '@uls/core-nodejs';
import { Author } from '@uls/ukulele-common';

export interface AuthorModel extends Author, Document {}

export const MODEL_NAME = 'Author';

export const createAuthorModel = (options: ServerModuleOptions) => {
    const AuthorSchema = new Schema<AuthorModel>({
        name: {
            type: String,
            required: true,
            unique: true,
        },
        members: {
            type: [Schema.Types.ObjectId],
            ref: MODEL_NAME,
        },
    });

    AuthorSchema.index({ name: 'text' });

    return model<AuthorModel>(MODEL_NAME, AuthorSchema);
};
