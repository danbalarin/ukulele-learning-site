import { Role } from '@uls/auth-common';

import { UserInteractor } from './UserInteractor';
import { User } from '../entities/User';

let ui: UserInteractor;

const user: User = {
    username: 'test',
    email: 'email@test.com',
    role: Role.USER,
    password: 'secret',
};

const hashFn = (str: string) => `${str}perfectHash`;

beforeEach(() => {
    ui = new UserInteractor(user);
});

it('should update values', () => {
    const username: Partial<User> = {
        username: 'real',
    };

    const email: Partial<User> = {
        email: 'email@real.com',
    };

    const role: Partial<User> = {
        role: Role.ADMIN,
    };

    const password: Partial<User> = {
        password: 'newSecret',
    };

    const userUsername = ui.update(username);
    const userEmail = ui.update(email);
    const userRole = ui.update(role);
    const userPassword = ui.update(password);

    expect(userUsername).toEqual({ ...user, username: 'real' });
    expect(userEmail).toEqual({ ...user, email: 'email@real.com' });
    expect(userRole).toEqual({ ...user, role: Role.ADMIN });
    expect(userPassword).toEqual({ ...user, password: 'newSecret' });
});

it('should strip sensitive information', () => {
    const userStripped = ui.stripUser();
    expect(userStripped).not.toEqual(user);

    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    expect(userStripped).toEqual(userWithoutPassword);
});

it('should match password', () => {
    const match = ui.matchPassword('secret', text => text);
    expect(match).toBe(true);
});

it('should not match password', () => {
    const match = ui.matchPassword('bad secret', text => text);
    expect(match).toBe(false);
});

it('should hash password', () => {
    const userHashed = ui.hashPassword(hashFn);
    expect(userHashed).not.toEqual(user);
    expect(userHashed).toEqual({ ...user, password: 'secretperfectHash' });

    const emptyUser: User = { email: '', role: Role.USER, username: '' };
    const emptyUi = new UserInteractor(emptyUser);
    expect(() => {
        emptyUi.hashPassword(hashFn);
    }).toThrowError();
});

describe('extra fields', () => {
    const overridenUser = { ...user, id: 'id' };

    beforeEach(() => {
        ui = new UserInteractor(overridenUser);
    });

    it('should update values', () => {
        const username: Partial<User> = {
            username: 'real',
        };

        const userUsername = ui.update(username);
        expect(userUsername).toEqual({ ...overridenUser, username: 'real' });
    });

    it('should strip sensitive information', () => {
        const userStripped = ui.stripUser();
        expect(userStripped).not.toEqual(overridenUser);

        const userWithoutPassword = { ...overridenUser };
        delete userWithoutPassword.password;
        expect(userStripped).toEqual(userWithoutPassword);
    });

    it('should hash password', () => {
        const userHashed = ui.hashPassword(hashFn);
        expect(userHashed).not.toEqual(overridenUser);
        expect(userHashed).toEqual({
            ...overridenUser,
            password: 'secretperfectHash',
        });
    });
});
