import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';

import { ChordProgression, Strum } from '@uls/ukulele-common';
import { CHORD_FRAGMENT_NAME, CHORD_FRAGMENT } from './chord';
import {
    STRUMMING_PATTERN_FRAGMENT_NAME,
    STRUMMING_PATTERN_FRAGMENT,
} from './strummingPattern';

export const CHORD_PROGRESSION_FRAGMENT_NAME = 'ChordProgressionFragment';
export const CHORD_PROGRESSION_FRAGMENT = gql`
    fragment ${CHORD_PROGRESSION_FRAGMENT_NAME} on ChordProgression {
        _id
        name
        creatorId
        chords{
            ...${CHORD_FRAGMENT_NAME}
        }
        strummingPattern {
            ...${STRUMMING_PATTERN_FRAGMENT_NAME}
        }
    }
    ${CHORD_FRAGMENT}
    ${STRUMMING_PATTERN_FRAGMENT}
`;

export interface CHORD_PROGRESSION_BY_CREATOR_RETURN {
    chordProgressionMany: ChordProgression<string>;
}

export interface CHORD_PROGRESSION_BY_CREATOR_VARIABLES {
    creator: string;
}

export const CHORD_PROGRESSION_BY_CREATOR = gql`
    query chordProgressionMany($creator: MongoID!) {
        chordProgressionMany(filter: { creator: $creator }) {
            name
            chords
            strummingPattern
        }
    }
`;

export const useChordProgressionByCreator = () =>
    useQuery<
        CHORD_PROGRESSION_BY_CREATOR_RETURN,
        CHORD_PROGRESSION_BY_CREATOR_VARIABLES
    >(CHORD_PROGRESSION_BY_CREATOR);

export interface CHORD_PROGRESSION_BY_ID_RETURN {
    chordProgressionById: ChordProgression<string> & {
        _id: string;
        creatorId: string;
    };
}

export interface CHORD_PROGRESSION_BY_ID_VARIABLES {
    _id: string;
}

export const CHORD_PROGRESSION_BY_ID = gql`
    query chordProgressionById($_id: MongoID!) {
        chordProgressionById(_id: $_id) {
            ...${CHORD_PROGRESSION_FRAGMENT_NAME}
        }
    }
    ${CHORD_PROGRESSION_FRAGMENT}
`;

export const useChordProgressionById = () =>
    useQuery<CHORD_PROGRESSION_BY_ID_RETURN, CHORD_PROGRESSION_BY_ID_VARIABLES>(
        CHORD_PROGRESSION_BY_ID
    );

interface NESTED_CHORD_PROGRESSION {
    name: string;
    chordsIds: string[];
}

export interface CHORD_PROGRESSION_CREATE_ONE_RETURN {
    chordProgressionCreateOne: {
        record: ChordProgression<any> & { _id: string; creatorId: string };
    };
}

export interface CHORD_PROGRESSION_CREATE_ONE_VARIABLES {
    chordProgression: NESTED_CHORD_PROGRESSION;
    tempo?: number;
    strummingPattern?: Strum[];
}

export const CHORD_PROGRESSION_CREATE_ONE = gql`
    mutation chordProgressionCreateOne(
        $chordProgression: ChordProgressionInput!,
        $tempo: Float,
        $strummingPattern: [Float]
    ) {
        chordProgressionCreateOne(
            chordProgression: $chordProgression
            tempo: $tempo
            strummingPattern: $strummingPattern
        ) {
            record {
                ...${CHORD_PROGRESSION_FRAGMENT_NAME}
            }
        }
    }
    ${CHORD_PROGRESSION_FRAGMENT}
`;

export const useChordProgressionCreateOne = () =>
    useMutation<
        CHORD_PROGRESSION_CREATE_ONE_RETURN,
        CHORD_PROGRESSION_CREATE_ONE_VARIABLES
    >(CHORD_PROGRESSION_CREATE_ONE, {
        fetchPolicy: 'no-cache',
    });

export interface CHORD_PROGRESSION_UPDATE_BY_ID_RETURN {
    chordProgressionUpdateById: {
        record: ChordProgression<any> & { _id: string; creatorId: string };
    };
}

export interface CHORD_PROGRESSION_UPDATE_BY_ID_VARIABLES {
    chordProgression: NESTED_CHORD_PROGRESSION;
    _id: string;
    tempo?: number;
    strummingPattern?: Strum[];
}

export const CHORD_PROGRESSION_UPDATE_BY_ID = gql`
    mutation chordProgressionUpdateById(
        $_id: MongoID!,
        $chordProgression: ChordProgressionInput!,
        $tempo: Float,
        $strummingPattern: [Float]
    ) {
        chordProgressionUpdateById(
            _id: $_id
            chordProgression: $chordProgression
            tempo: $tempo
            strummingPattern: $strummingPattern
        ) {
            record {
                ...${CHORD_PROGRESSION_FRAGMENT_NAME}
            }
        }
    }
    ${CHORD_PROGRESSION_FRAGMENT}
`;

export const useChordProgressionUpdateById = () =>
    useMutation<
        CHORD_PROGRESSION_UPDATE_BY_ID_RETURN,
        CHORD_PROGRESSION_UPDATE_BY_ID_VARIABLES
    >(CHORD_PROGRESSION_UPDATE_BY_ID, {
        fetchPolicy: 'no-cache',
    });
