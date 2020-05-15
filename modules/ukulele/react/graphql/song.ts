import gql from 'graphql-tag';
import { useMutation, useQuery, QueryHookOptions } from '@apollo/client';

import { Song } from '@uls/ukulele-common';

// export interface AUTHOR_CREATE_ONE_RETURN {
//     authorCreateOne: { record: Author & { _id: string } };
// }

// export interface AUTHOR_CREATE_ONE_VARIABLES {
//     record: { name: string; memberIds: string[] };
// }

// export const AUTHOR_CREATE_ONE = gql`
//     mutation authorCreateOne($record: CreateOneAuthorInput!) {
//         authorCreateOne(record: $record) {
//             record {
//             ...${AUTHOR_FRAGMENT_NAME}
//             }
//         }
//     }
//     ${AUTHOR_FRAGMENT}
// `;

// export const useAuthorCreateOne = () =>
//     useMutation<AUTHOR_CREATE_ONE_RETURN, AUTHOR_CREATE_ONE_VARIABLES>(
//         AUTHOR_CREATE_ONE,
//         {
//             fetchPolicy: 'no-cache',
//         }
//     );

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
            _id
            title
            lyrics
        }
    }
`;

export const useSongMany = (variables: SONG_MANY_VARIABLES) =>
    useQuery<SONG_MANY_RETURN, SONG_MANY_VARIABLES>(SONG_MANY, {
        variables,
        fetchPolicy: 'no-cache',
    });

export interface SONG_BY_ID_RETURN {
    songOne: Song<any>;
}

export interface SONG_BY_ID_VARIABLES {
    _id: string;
}

export const SONG_BY_ID = gql`
    query songOne($_id: MongoID!) {
        songOne(filter: { _id: $_id }) {
            title
            lyrics
        }
    }
`;

export const useSongById = (variables: SONG_BY_ID_VARIABLES) =>
    useQuery<SONG_BY_ID_RETURN, SONG_BY_ID_VARIABLES>(SONG_BY_ID, {
        variables,
        fetchPolicy: 'no-cache',
    });
