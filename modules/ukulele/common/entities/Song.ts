import { Creator } from '@uls/core-common';

import { Author } from './Author';
import { Chord } from './Chords';
import { StrummingPattern } from './StrummingPattern';

/**
 * @packageDocumentation
 * @module @uls/ukulele-common
 */

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
     * Song lyrics
     */
    lyrics: string;

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
