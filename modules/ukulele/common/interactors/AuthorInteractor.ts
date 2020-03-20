import { Author } from '../entities/Author';
import { EntityBase, Updatable } from '@uls/core-common';

/**
 * Interactor for {@link Author} entity
 *
 */
export class AuthorInteractor implements EntityBase<Author>, Updatable<Author> {
    _entity: Author;

    constructor(author: Author) {
        this._entity = author;
    }

    /**
     * Update {@link Author}
     *
     * @param fieldsToUpdate Field to be updated
     * @returns New updated {@link Author} object
     */
    update(fieldsToUpdate: Partial<Omit<Author, 'id'>>): Author {
        const newEntity: Author = { ...this._entity, ...fieldsToUpdate };
        return newEntity;
    }
}
