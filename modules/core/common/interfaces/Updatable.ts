export interface Updatable<T> {
    update(fieldsToUpdate: Partial<Omit<T, 'id'>>): T;
}
