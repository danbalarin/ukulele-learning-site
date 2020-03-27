import { User } from '../entities/User';
import { EntityBase, Updatable, HashFunction } from '@uls/core-common';

/**
 * Interactor for {@link User} entity
 */

export class UserInteractor implements EntityBase<User>, Updatable<User> {
    _entity: User;

    constructor(user: User) {
        this._entity = user;
    }

    /**
     * Update {@link User}
     *
     * @param fieldsToUpdate Field to be updated
     * @returns New updated {@link User} object
     */

    update(fieldsToUpdate: Partial<Omit<User, 'id'>>): User {
        const newUser: User = { ...this._entity, ...fieldsToUpdate };
        return newUser;
    }

    /**
     * Strips {@link User} from any sensitive information such as password hash
     *
     * @returns New stripped {@link User} object
     */
    stripUser(): User {
        const newUser: User = { ...this._entity };
        delete newUser.password;
        return newUser;
    }

    /**
     * Hashes user password
     *
     * @param hashFn Hash function
     * @returns New {@link User} object with hashed password
     */
    hashPassword(hashFn: HashFunction): User {
        const newUser: User = {
            ...this._entity,
        };
        if (!newUser.password) {
            throw new Error('Cannot hash user with empty password');
        }
        newUser.password = hashFn(newUser.password);
        return newUser;
    }

    /**
     * Matches stored password against provided
     *
     * @param password Tested password
     * @param hashFn Hash function
     * @returns Whether passwords match
     */
    matchPassword(password: string, hashFn: HashFunction): boolean {
        return this._entity.password === hashFn(password);
    }
}
