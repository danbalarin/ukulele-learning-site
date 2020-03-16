export interface SeedFaker {
    username: () => string;
    email: () => string;
    password: () => string;
    number: () => number;
}

export interface SeedResult<T> {
    model: string;
    data: T[];
}
