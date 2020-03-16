import { Document, model, Schema, HookNextFunction } from 'mongoose';

import { User, Role } from '@uls/user-common';
import { HashFunction } from '@uls/core-nodejs';

export interface UserModel extends Omit<User, '_id'>, Document {
    passwordConfirm: (passwordCandidate: string) => boolean;
}

export const createUserModel = (hashFn: HashFunction) => {
    const UserSchema = new Schema<UserModel>({
        username: {
            type: String,
            required: true,
            unique: true,
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

    UserSchema.method('passwordConfirm', function(
        this: UserModel,
        passwordCandidate: string
    ) {
        const isMatch = this.password === hashFn(passwordCandidate);
        return isMatch;
    });

    UserSchema.pre<UserModel>('save', async function(next) {
        if (this.isModified('password')) {
            this.password = hashFn(this.password as string);
        }
        next();
    });

    UserSchema.set('toJSON', {
        transform: function(doc, ret, opt) {
            delete ret['password'];
            return ret;
        },
    });

    return model<UserModel>('User', UserSchema);
};
