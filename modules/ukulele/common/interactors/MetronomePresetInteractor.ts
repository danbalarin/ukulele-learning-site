import { EntityBase, Updatable } from '../../../core/common';
import { MetronomePreset } from '../entities/MetronomePreset';

/**
 * Interactor for {@link MetronomePreset} entity
 */
export class MetronomePresetInteractor
    implements EntityBase<MetronomePreset>, Updatable<MetronomePreset> {
    _entity: MetronomePreset;

    constructor(song: MetronomePreset) {
        this._entity = song;
    }

    /**
     * Update {@link MetronomePreset}
     *
     * @param fieldsToUpdate Field to be updated
     */
    update(
        fieldsToUpdate: Partial<Omit<MetronomePreset, 'id'>>
    ): MetronomePreset {
        const newEntity = { ...this._entity, ...fieldsToUpdate };
        return newEntity;
    }
}
