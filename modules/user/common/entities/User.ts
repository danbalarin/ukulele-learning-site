import { Role } from '@uls/auth-common';

/**
 * User object
 */
export interface User {
    email: string;
    username: string;
    password?: string;
    role: Role;
}
