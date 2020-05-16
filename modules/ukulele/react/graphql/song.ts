import gql from 'graphql-tag';
import { useMutation, useQuery, QueryHookOptions } from '@apollo/client';

import { Song, Strum } from '@uls/ukulele-common';

import { AUTHOR_FRAGMENT_NAME, AUTHOR_FRAGMENT } from './author';
import {
    STRUMMING_PATTERN_FRAGMENT_NAME,
    STRUMMING_PATTERN_FRAGMENT,
} from './strummingPattern';
import { CHORD_FRAGMENT, CHORD_FRAGMENT_NAME } from './chord';

export const SONG_FRAGMENT_NAME = 'SongFragment';
export const SONG_FRAGMENT = gql`
    fragment ${SONG_FRAGMENT_NAME} on Song {
        _id
        title
        chords{
            ...${CHORD_FRAGMENT_NAME}
        }
        lyrics{
            lyrics
            chords{
                offset
                chord{
                    ...${CHORD_FRAGMENT_NAME}
                }
            }
        }
        author {
            ...${AUTHOR_FRAGMENT_NAME}
        }
        strummingPattern {
            ...${STRUMMING_PATTERN_FRAGMENT_NAME}
        }
    }
    ${CHORD_FRAGMENT}
    ${AUTHOR_FRAGMENT}
    ${STRUMMING_PATTERN_FRAGMENT}
`;

interface NESTED_SONG {
    title: string;
    lyrics: { chords: { chordId: string; offset: number }[]; lyrics: string }[];
    chordsIds: string[];
    authorId?: string;
}

export interface SONG_CREATE_ONE_RETURN {
    songCreateOne: { record: Song<any> & { _id: string } };
}

export interface SONG_CREATE_ONE_VARIABLES {
    song: NESTED_SONG;
    tempo?: number;
    strummingPattern?: Strum[];
}

export const SONG_CREATE_ONE = gql`
    mutation songCreateOne($song: SongInput!, $tempo: Float, $strummingPattern: [Float]) {
        songCreateOne(
            song: $song
            tempo: $tempo
            strummingPattern: $strummingPattern
        ) {
            record {
                ...${SONG_FRAGMENT_NAME}
            }
        }
    }
    ${SONG_FRAGMENT}
`;

export const useSongCreateOne = () =>
    useMutation<SONG_CREATE_ONE_RETURN, SONG_CREATE_ONE_VARIABLES>(
        SONG_CREATE_ONE,
        {
            fetchPolicy: 'no-cache',
        }
    );

export interface SONG_UPDATE_BY_ID_RETURN {
    songUpdateById: { record: Song<any> & { _id: string } };
}

export interface SONG_UPDATE_BY_ID_VARIABLES {
    song: NESTED_SONG;
    _id: string;
    tempo?: number;
    strummingPattern?: Strum[];
}

export const SONG_UPDATE_BY_ID = gql`
    mutation songUpdateById($_id: MongoID!, $song: SongInput!, $tempo: Float, $strummingPattern: [Float]) {
        songUpdateById(
            _id: $_id
            song: $song
            tempo: $tempo
            strummingPattern: $strummingPattern
        ) {
            record {
                ...${SONG_FRAGMENT_NAME}
            }
        }
    }
    ${SONG_FRAGMENT}
`;

export const useSongUpdateById = () =>
    useMutation<SONG_UPDATE_BY_ID_RETURN, SONG_UPDATE_BY_ID_VARIABLES>(
        SONG_UPDATE_BY_ID,
        {
            fetchPolicy: 'no-cache',
        }
    );

export interface SONG_MANY_RETURN {
    songMany: (Song<any> & { _id: string })[];
}

export interface SONG_MANY_VARIABLES {
    filter?: { name: string };
    limit?: number;
}

export const SONG_MANY = gql`
    query songMany($filter: FilterFindManySongInput, $limit: Int) {
        songMany(filter: $filter, limit: $limit) {
            ...${SONG_FRAGMENT_NAME}
        }
    }
    ${SONG_FRAGMENT}
`;

export const useSongMany = (variables: SONG_MANY_VARIABLES) =>
    useQuery<SONG_MANY_RETURN, SONG_MANY_VARIABLES>(SONG_MANY, {
        variables,
        fetchPolicy: 'no-cache',
    });

export interface SONG_BY_ID_RETURN {
    songOne: Song<any> & { _id: string };
}

export interface SONG_BY_ID_VARIABLES {
    _id: string;
}

export const SONG_BY_ID = gql`
    query songOne($_id: MongoID!) {
        songOne(filter: { _id: $_id }) {
            ...${SONG_FRAGMENT_NAME}
        }
    }
    ${SONG_FRAGMENT}
`;

export const useSongById = (variables: SONG_BY_ID_VARIABLES) =>
    useQuery<SONG_BY_ID_RETURN, SONG_BY_ID_VARIABLES>(SONG_BY_ID, {
        variables,
        fetchPolicy: 'no-cache',
    });
