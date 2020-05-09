import { ObjectTypeComposer } from 'graphql-compose';
import { Document, Schema, model } from 'mongoose';

import { ServerModuleOptions } from '@uls/core-nodejs';
import { Author } from '@uls/ukulele-common';

export interface AuthorModel extends Author, Document {
    memberIds: Schema.Types.ObjectId[];
}

export const MODEL_NAME = 'Author';

export const createAuthorModel = (
    options: ServerModuleOptions<ObjectTypeComposer>
) => {
    const AuthorSchema = new Schema<AuthorModel>({
        name: {
            type: String,
            required: true,
            unique: true,
        },
        memberIds: {
            type: [Schema.Types.ObjectId],
            ref: MODEL_NAME,
        },
    });

    AuthorSchema.index({ name: 'text' });

    return model<AuthorModel>(MODEL_NAME, AuthorSchema);
};
