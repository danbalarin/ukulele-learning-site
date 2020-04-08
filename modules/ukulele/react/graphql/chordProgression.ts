import gql from 'graphql-tag';
import { useMutation, useQuery, Resolver } from '@apollo/client';

import { ChordProgression } from '@uls/ukulele-common';

const CHORD_PROGRESSION_BY_CREATOR = gql`
    query chordProgressionMany($creator: MongoID!) {
        chordProgressionMany(filter: { creator: $creator }) {
            name
            chords
            strummingPattern
        }
    }
`;

export const useChordProgressionByCreator = () =>
    useQuery<ChordProgression<string>, { creator: string }>(
        CHORD_PROGRESSION_BY_CREATOR
    );
