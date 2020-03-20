import { EntityBase, Updatable } from '@uls/core-common';
import { ChordProgression } from '../entities/ChordProgression';

/**
 * Interactor for {@link ChordProgression} entity
 *
 * @typeparam T creator entity
 */
export class ChordProgressionInteractor<T>
    implements EntityBase<ChordProgression<T>>, Updatable<ChordProgression<T>> {
    _entity: ChordProgression<T>;

    constructor(chordProgression: ChordProgression<T>) {
        this._entity = chordProgression;
    }

    /**
     * Update {@link ChordProgression<T>}
     *
     * @param fieldsToUpdate Field to be updated
     * @returns New updated {@link ChordProgression} object
     */
    update(
        fieldsToUpdate: Partial<Omit<ChordProgression<T>, 'id'>>
    ): ChordProgression<T> {
        const newEntity = { ...this._entity, ...fieldsToUpdate };
        return newEntity;
    }
}
