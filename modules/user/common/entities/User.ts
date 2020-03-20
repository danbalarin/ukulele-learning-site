/**
 * User role
 */
export enum Role {
    USER,
    MODERATOR,
    ADMIN,
}

/**
 * User object
 */
export interface User {
    email: string;
    username: string;
    password?: string;
    role: Role;
}
