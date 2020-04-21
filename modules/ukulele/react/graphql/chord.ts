import gql from 'graphql-tag';
import { useMutation, useQuery, QueryHookOptions } from '@apollo/client';

import { Chord } from '@uls/ukulele-common';

export interface CHORD_BY_ID_RETURN {
    chordOne: Chord;
}

export interface CHORD_BY_ID_VARIABLES {
    name: string;
}

export const CHORD_BY_ID = gql`
    query chordOne($name: String!) {
        chordOne(filter: { name: $name }) {
            name
            strings
        }
    }
`;

export const useChordByName = (
    options: QueryHookOptions<any, CHORD_BY_ID_VARIABLES>
) => useQuery<CHORD_BY_ID_RETURN, CHORD_BY_ID_VARIABLES>(CHORD_BY_ID, options);

export interface CHORD_SEARCH_RETURN {
    chordSearch: Chord[];
}

export interface CHORD_SEARCH_VARIABLES {
    query: string;
}

export const CHORD_SEARCH = gql`
    query chordSearch($query: String!) {
        chordSearch(query: $query) {
            name
            strings
        }
    }
`;
