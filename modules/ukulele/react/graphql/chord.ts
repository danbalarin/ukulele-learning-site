import gql from 'graphql-tag';
import { useMutation, useQuery, QueryHookOptions } from '@apollo/client';

import { Chord } from '@uls/ukulele-common';

const CHORD_BY_ID = gql`
    query chordOne($name: String!) {
        chordOne(filter: { name: $name }) {
            name
            strings
        }
    }
`;

export const useChordByName = (
    options: QueryHookOptions<any, { name: string }>
) => useQuery<{ chordOne: Chord }, { name: string }>(CHORD_BY_ID, options);
