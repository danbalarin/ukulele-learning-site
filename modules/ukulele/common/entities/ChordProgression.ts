import { Creator } from '@uls/core-common';

import { StrummingPattern } from './StrummingPattern';
import { Chord } from './Chords';

/**
 * Chord progression model
 *
 * @typeparam T creator entity
 */
export interface ChordProgression<T> extends Creator<T> {
    /**
     * Chord progression name
     */
    name: string;

    /**
     * Chord progression strumming pattern
     */
    strummingPattern?: StrummingPattern;

    /**
     * Chord progression chords
     */
    chords: Chord[];
}
