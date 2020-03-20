import { Document, model, Schema } from 'mongoose';

import { HashFunction } from '@uls/core-common';
import { User, Role, UserInteractor } from '@uls/user-common';

export interface UserModel extends User, Document {
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

    UserSchema.pre<UserModel>('save', async function(this: UserModel, next: () => void) {
        if (this.isModified('password')) {
            const ui = new UserInteractor(this as User);
            const newUser: User = ui.hashPassword(hashFn);
            this.password = newUser.password;
        }
        next();
    });

    UserSchema.set('toJSON', {
        transform: function(doc: any, ret: any, opt: any) {
            const ui = new UserInteractor(ret as User);
            return ui.stripUser();
        },
    });

    return model<UserModel>('User', UserSchema);
};
