export enum Role {
    USER,
    MODERATOR,
    ADMIN,
}

export interface User {
    email: string;
    username: string;
    password: string;
    role: Role;
}
