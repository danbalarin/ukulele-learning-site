import gql from 'graphql-tag';
import { useMutation, useQuery, QueryHookOptions } from '@apollo/client';

import { Author } from '@uls/ukulele-common';

interface FreagmentAuthor extends Author {
    _id: string;
    songs: {
        _id: string;
        title: string;
        liked: boolean;
    }[];
}

export const AUTHOR_FRAGMENT_NAME = 'AuthorFragment';
export const AUTHOR_FRAGMENT = gql`
    fragment ${AUTHOR_FRAGMENT_NAME} on Author {
        _id
        name
        members {
            _id
            name
            members {
                _id
                name
            }
        }
        songs {
            _id
            title
            liked
        }
    }
`;

export interface AUTHOR_CREATE_ONE_RETURN {
    authorCreateOne: { record: FreagmentAuthor };
}

export interface AUTHOR_CREATE_ONE_VARIABLES {
    record: { name: string; memberIds: string[] };
}

export const AUTHOR_CREATE_ONE = gql`
    mutation authorCreateOne($record: CreateOneAuthorInput!) {
        authorCreateOne(record: $record) {
            record {
            ...${AUTHOR_FRAGMENT_NAME}
            }
        }
    }
    ${AUTHOR_FRAGMENT}
`;

export const useAuthorCreateOne = () =>
    useMutation<AUTHOR_CREATE_ONE_RETURN, AUTHOR_CREATE_ONE_VARIABLES>(
        AUTHOR_CREATE_ONE,
        {
            fetchPolicy: 'no-cache',
        }
    );

export interface AUTHOR_SEARCH_RETURN {
    authorSearch: FreagmentAuthor[];
}

export interface AUTHOR_SEARCH_VARIABLES {
    query: string;
}

export const AUTHOR_SEARCH = gql`
    query authorSearch($query: String!) {
        authorSearch(query: $query) {
            ...${AUTHOR_FRAGMENT_NAME}
        }
    }
    ${AUTHOR_FRAGMENT}
`;

export interface AUTHOR_MANY_RETURN {
    authorMany: FreagmentAuthor[];
}

export interface AUTHOR_MANY_VARIABLES {
    filter?: { name: string };
    limit?: number;
}

export const AUTHOR_MANY = gql`
    query authorMany($filter: FilterFindManyAuthorInput, $limit: Int) {
        authorMany(filter: $filter, limit: $limit) {
            ...${AUTHOR_FRAGMENT_NAME}
        }
    }
    ${AUTHOR_FRAGMENT}
`;

export const useAuthorMany = (variables: AUTHOR_MANY_VARIABLES) =>
    useQuery<AUTHOR_MANY_RETURN, AUTHOR_MANY_VARIABLES>(AUTHOR_MANY, {
        variables,
        fetchPolicy: 'no-cache',
    });

export interface AUTHOR_UPDATE_BY_ID_VARIABLES {
    record: { _id: string } & Partial<Author>;
}

export interface AUTHOR_UPDATE_BY_ID_RETURN {
    authorUpdateById: { record: { name: string; _id: string } };
}

export const AUTHOR_UPDATE_BY_ID = gql`
    mutation authorUpdateById($record: UpdateByIdAuthorInput!) {
        authorUpdateById(record: $record) {
            record {
                _id
                name
            }
        }
    }
`;

export interface AUTHOR_REMOVE_BY_ID_VARIABLES {
    _id: string;
}

export interface AUTHOR_REMOVE_BY_ID_RETURN {
    authorRemoveById: { record: { name: string; _id: string } };
}

export const AUTHOR_REMOVE_BY_ID = gql`
    mutation authorRemoveById($_id: MongoID!) {
        authorRemoveById(_id: $_id) {
            record {
                _id
                name
            }
        }
    }
`;

export const useAuthorRemoveById = () =>
    useMutation<AUTHOR_REMOVE_BY_ID_RETURN, AUTHOR_REMOVE_BY_ID_VARIABLES>(
        AUTHOR_REMOVE_BY_ID,
        {
            fetchPolicy: 'no-cache',
        }
    );

export interface AUTHOR_BY_ID_RETURN {
    authorOne: FreagmentAuthor;
}

export interface AUTHOR_BY_ID_VARIABLES {
    _id: string;
}

export const AUTHOR_BY_ID = gql`
    query authorOne($_id: MongoID!) {
        authorOne(filter: { _id: $_id }) {
            ...${AUTHOR_FRAGMENT_NAME}
        }
    }
    ${AUTHOR_FRAGMENT}
`;

export const useAuthorById = (variables: AUTHOR_BY_ID_VARIABLES) =>
    useQuery<AUTHOR_BY_ID_RETURN, AUTHOR_BY_ID_VARIABLES>(AUTHOR_BY_ID, {
        variables,
        fetchPolicy: 'no-cache',
    });
