import gql from 'graphql-tag';

import { User } from '@uls/user-common';
import { Song, Author, Chord } from '@uls/ukulele-common';

export type SEARCH_QUERY_VARIABLES = { query: string };

type Typename = { __typename: string };

export type SearchUnionType =
    | (User & Typename)
    | (Song<User> & Typename)
    | (Author & Typename)
    | (Chord & Typename);

export type SEARCH_QUERY_RESULT = { search: SearchUnionType[] };

// TODO
export const SEARCH_QUERY = gql`
    query search($query: String!) {
        __typename
        search(query: $query) {
            ... on User {
                _id
                username
                email
                role
            }
            ... on Song {
                _id
                title
                creator {
                    username
                }
            }
            ... on Author {
                _id
                name
                members
            }
            ... on Chord {
                _id
                name
                strings
            }
        }
    }
`;
