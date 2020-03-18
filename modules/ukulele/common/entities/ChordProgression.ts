import { User } from '@uls/user-common';
import { Creator } from '@uls/core-common';

import { StrummingPattern } from './StrummingPattern';
import { Chord } from './Chords';

/**
 * Chord progression
 */
export interface ChordProgression extends Creator<User> {
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
    chords: Chord;
}
