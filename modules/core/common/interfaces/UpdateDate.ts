/**
 * @packageDocumentation
 * @module @uls/core-common
 */

/**
 * Provides way to keep track of the date of last update.
 *
 * @param T Datetime type
 */
export interface UpdateDate<T> {
    updated: T;
}
