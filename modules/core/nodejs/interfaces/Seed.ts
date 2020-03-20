/**
 * Seed faker interface
 */
export interface SeedFaker {
    /**
     * Creates random username
     * 
     * @returns random username
     */
    username: () => string;

    /**
     * Creates random valid email
     * 
     * @returns random email
     */
    email: () => string;

    /**
     * Creates random password
     * 
     * @returns random password
     */
    password: () => string;

    /**
     * Creates random number
     * 
     * @returns random number
     */
    number: () => number;
}

/**
 * Result of seed function, obejct containing model data name and data
 * 
 * @param T data type
 */
export interface SeedResult<T> {
    model: string;
    data: T[];
}
