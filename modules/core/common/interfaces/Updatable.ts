/**
 * @packageDocumentation
 * @module @uls/core-common
 */

/**
 * Provides interface for update method in interactors
 *
 * @param T Entity type to be edited
 * @returns New edited copy of T
 */
export interface Updatable<T> {
    update(fieldsToUpdate: Partial<Omit<T, 'id'>>): T;
}
