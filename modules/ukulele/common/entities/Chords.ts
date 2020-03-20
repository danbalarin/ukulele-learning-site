import { Tone } from './Tone';

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
