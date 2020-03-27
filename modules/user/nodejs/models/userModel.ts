import { Document, model, Schema } from 'mongoose';

import { ServerModuleOptions } from '@uls/core-nodejs';
import { User, Role, UserInteractor } from '@uls/user-common';

export interface UserModel extends User, Document {
    passwordConfirm: (passwordCandidate: string) => boolean;
}

export const MODEL_NAME = 'User';

export const createUserModel = (options: ServerModuleOptions) => {
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
        const ui = new UserInteractor(this);
        return ui.matchPassword(passwordCandidate, options.hashFunction);
    });

    UserSchema.pre<UserModel>('save', async function(
        this: UserModel,
        next: () => void
    ) {
        if (this.isModified('password')) {
            const ui = new UserInteractor(this);
            const newUser: User = ui.hashPassword(options.hashFunction);
            this.password = newUser.password;
        }
        next();
    });

    UserSchema.set('toJSON', {
        transform: function(doc: any, ret: any, opt: any) {
            const ui = new UserInteractor(ret);
            return ui.stripUser();
        },
    });

    return model<UserModel>(MODEL_NAME, UserSchema);
};
