import { User } from '../entities/User';

export class UserInteractor {
    _user: User;

    constructor(user: User) {
        this._user = user;
    }

    updateUser(fieldsToUpdate: Partial<Omit<User, 'id'>>) {
        const newUser = { ...this._user, ...fieldsToUpdate };
        return newUser;
    }
}
