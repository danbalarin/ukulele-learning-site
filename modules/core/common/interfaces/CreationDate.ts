/**
 * @packageDocumentation
 * @module @uls/core-common
 */

/**
 * Provides way to keep track of the date of creation.
 *
 * @param T Datetime type
 */
export interface CreationDate<T> {
    created: T;
}
