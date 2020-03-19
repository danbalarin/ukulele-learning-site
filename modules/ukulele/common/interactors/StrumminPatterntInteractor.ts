import { EntityBase, Updatable } from '@uls/core-common';
import { StrummingPattern } from '../entities/StrummingPattern';
/**
 * @packageDocumentation
 * @module @uls/ukulele-common
 */

/**
 * Interactor for {@link Song} entity
 */
export class StrummingPatternInteractor
    implements EntityBase<StrummingPattern>, Updatable<StrummingPattern> {
    _entity: StrummingPattern;

    constructor(strummingPattern: StrummingPattern) {
        this._entity = strummingPattern;
    }

    /**
     * Update {@link StrummingPattern}
     *
     * @param fieldsToUpdate Field to be updated
     * @returns New updated {@link StrummingPattern} object
     */
    update(
        fieldsToUpdate: Partial<Omit<StrummingPattern, 'id'>>
    ): StrummingPattern {
        const newEntity = { ...this._entity, ...fieldsToUpdate };
        return newEntity;
    }
}
