import { Tone } from './Tone';

export enum ChordType {
    Major,
    Minor,
    DominantSeventh,
    MajorSeventh,
    MinorSeventh,
    DimishedSeventh,
}

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

    /**
     * Chord type, empty defaults to {@link ChordType.Major }
     */
    type?: ChordType;
}
