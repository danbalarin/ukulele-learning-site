import { User } from '../entities/User';
import { EntityBase, Updatable } from '@uls/core-common';

export class UserInteractor implements EntityBase<User>, Updatable<User> {
    _entity: User;

    constructor(user: User) {
        this._entity = user;
    }

    update(fieldsToUpdate: Partial<Omit<User, 'id'>>): User {
        const newUser: User = { ...this._entity, ...fieldsToUpdate };
        return newUser;
    }

    stripUser(): User {
        const newUser: User = {
            email: this._entity.email,
            role: this._entity.role,
            username: this._entity.username,
        };
        return newUser;
    }
}
