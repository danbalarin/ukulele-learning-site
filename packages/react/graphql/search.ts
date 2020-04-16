import gql from 'graphql-tag';
import { SearchGroup } from '@uls/look-react';

export type SEARCH_QUERY_VARIABLES = { query: string };

export type SEARCH_QUERY_RESULT = { search: SearchGroup[] };

export const SEARCH_QUERY = gql`
    query($query: String!) {
        search(query: $query) {
            label
            options {
                label
                value
            }
        }
    }
`;
