import { User, Role } from '@uls/user-common';

import { Document, model, Schema } from 'mongoose';

interface UserModel extends User, Document {}

export const createUserModel = (hashFn: (text: string) => Promise<string>) => {
    const UserSchema = new Schema<UserModel>({
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: Number,
            enum: [Role.USER, Role.MODERATOR, Role.ADMIN],
            required: true,
            default: Role.USER,
        },
    });

    UserSchema.pre<UserModel>('save', async function(next) {
        if (this.isModified('password')) {
            this.password = await hashFn(this.password);
        }
        next();
    });

    return model<UserModel>('User', UserSchema);
};
