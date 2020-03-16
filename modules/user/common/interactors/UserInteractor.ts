import { User } from '../entities/User';

export class UserInteractor {
    _user: User;

    constructor(user: User) {
        this._user = user;
    }

    updateUser(fieldsToUpdate: Partial<Omit<User, 'id'>>): User {
        const newUser: User = { ...this._user, ...fieldsToUpdate };
        return newUser;
    }

    stripUser(): User {
        const newUser: User = {
            email: this._user.email,
            role: this._user.role,
            username: this._user.username,
        };
        return newUser;
    }
}
