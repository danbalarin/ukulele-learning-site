/**
 * Provides interface for update method in interactors. Should create new shallow copy of object
 *
 * @param T Entity type to be edited
 * @returns New edited copy of T
 */
export interface Updatable<T> {
    update(fieldsToUpdate: Partial<Omit<T, 'id'>>): T;
}
