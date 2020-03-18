import { EntityBase, Updatable } from '../../../core/common';
import { ChordProgression } from '../entities/ChordProgression';

/**
 * Interactor for {@link ChordProgression} entity
 */
export class ChordProgressionInteractor
    implements EntityBase<ChordProgression>, Updatable<ChordProgression> {
    _entity: ChordProgression;

    constructor(chordProgression: ChordProgression) {
        this._entity = chordProgression;
    }

    /**
     * Update {@link ChordProgression}
     *
     * @param fieldsToUpdate Field to be updated
     */
    update(
        fieldsToUpdate: Partial<Omit<ChordProgression, 'id'>>
    ): ChordProgression {
        const newEntity = { ...this._entity, ...fieldsToUpdate };
        return newEntity;
    }
}
