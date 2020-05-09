import { Creator } from '@uls/core-common';

import { Author } from './Author';
import { Chord } from './Chords';
import { StrummingPattern } from './StrummingPattern';

/**
 * Chord position on the line
 */
export interface ChordPosition {
    /**
     * Offset from beggining of the line
     */
    offset: number;

    /**
     * Chord
     */
    chord: Chord;
}

/**
 * Describes single line of lyrics with chords
 */
export interface SongLine {
    /**
     * Chords on the line
     */
    chords: ChordPosition[];

    /**
     * Song lyrics for one line
     */
    lyrics: string;
}

/**
 * Song entity
 *
 * @typeparam T creator entity
 */
export interface Song<T> extends Creator<T> {
    /**
     * Song title
     */
    title: string;

    /**
     * Song lyrics and chords
     */
    lyrics: SongLine[];

    /**
     * Song author/authors
     */
    author?: Author;

    /**
     * Song chords
     */
    chords: Chord[];

    /**
     * Song Strumming pattern
     */
    strummingPattern?: StrummingPattern;
}
