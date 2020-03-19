/**
 * @packageDocumentation
 * @module @uls/core-common
 */

/**
 * Provides way to keep track of creator of entity.
 *
 * @param T Creator entity type
 */
export interface Creator<T> {
    creator: T;
}
