import { Tone } from './Tone';

/**
 * @packageDocumentation
 * @module @uls/ukulele-common
 */

/**
 * Chord
 */
export interface Chord {
    /**
     * Chord name
     */
    name: string;

    /**
     * Chord string tones
     */
    strings: [Tone, Tone, Tone, Tone];
}
