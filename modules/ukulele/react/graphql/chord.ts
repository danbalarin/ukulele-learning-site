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

export interface CHORD_MANY_RETURN {
    chordMany: Chord[];
}

export interface CHORD_MANY_VARIABLES {
    filter?: { name: string };
}

export const CHORD_MANY = gql`
    query chordMany($filter: FilterFindManyChordInput) {
        chordMany(filter: $filter) {
            name
            strings
        }
    }
`;

export const useChordMany = (variables: CHORD_MANY_VARIABLES) =>
    useQuery<CHORD_MANY_RETURN, CHORD_MANY_VARIABLES>(CHORD_MANY, {
        variables,
    });
