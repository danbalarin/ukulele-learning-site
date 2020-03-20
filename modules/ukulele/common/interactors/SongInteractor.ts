import { EntityBase, Updatable } from '@uls/core-common';
import { Song } from '../entities/Song';

/**
 * Interactor for {@link Song} entity
 *
 * @typeparam T creator entity
 */
export class SongInteractor<T>
    implements EntityBase<Song<T>>, Updatable<Song<T>> {
    _entity: Song<T>;

    constructor(song: Song<T>) {
        this._entity = song;
    }

    /**
     * Update {@link Song}
     *
     * @param fieldsToUpdate Field to be updated
     * @returns New updated {@link Song} object
     */
    update(fieldsToUpdate: Partial<Omit<Song<T>, 'id'>>): Song<T> {
        const newEntity = { ...this._entity, ...fieldsToUpdate };
        return newEntity;
    }
}
