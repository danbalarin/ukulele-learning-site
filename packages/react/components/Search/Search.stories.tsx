import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { MockedProvider } from '@apollo/client/testing';

import Search from './Search';
import {
    SEARCH_QUERY,
    SEARCH_QUERY_RESULT,
    SEARCH_QUERY_VARIABLES,
} from '../../graphql/search';
import { Role } from '../../../../modules/auth/common';

const createResult = (role: Role): SEARCH_QUERY_RESULT => {
    const res: SEARCH_QUERY_RESULT = {
        search: [
            { __typename: 'Chord', name: 'A' },
            { __typename: 'Chord', name: 'Am' },
            { __typename: 'Author', name: 'Vance Joy' },
            { __typename: 'Song', name: 'International' },
        ],
    };
    if (role === Role.ADMIN) {
        res.search.push(
            ...[
                {
                    __typename: 'User',
                    email: 'admin@test.com',
                    username: 'admin',
                    role: 2,
                },
                {
                    __typename: 'User',
                    email: 'alex@test.com',
                    username: 'alex',
                    role: 0,
                },
            ]
        );
    }
    return res;
};

const variables: SEARCH_QUERY_VARIABLES = {
    query: 'a',
};

const createMocks = (role: Role) => [
    {
        request: {
            query: SEARCH_QUERY,
            variables: variables,
        },
        result: { data: createMocks(role) },
    },
];

storiesOf('Package/Search', module)
    .addDecorator(withKnobs)
    .add('Basic search', () => {
        const role = select(
            'Role',
            { Admin: Role.ADMIN, Moderator: Role.MODERATOR, User: Role.USER },
            Role.USER
        );
        return (
            <MockedProvider mocks={createMocks(role)}>
                <Search keyName="storySearch" />
            </MockedProvider>
        );
    });
