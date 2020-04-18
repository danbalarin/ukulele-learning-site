import React, { ReactElement, useState } from 'react';
import { useApolloClient } from '@apollo/client';

import { SearchGroup, SearchOption } from '@uls/look-react';
import { Song, Author, Chord } from '@uls/ukulele-common';
import { User } from '@uls/user-common';

import SearchPresenter from './SearchPresenter';
import {
    SEARCH_QUERY,
    SEARCH_QUERY_RESULT,
    SEARCH_QUERY_VARIABLES,
    SearchUnionType,
} from '../../graphql/search';
import { WithID, transformSearchResult } from './searchUtils';

interface Props {}

function Search({}: Props): ReactElement {
    const client = useApolloClient();
    const [loading, setLoading] = useState(false);

    const getDefaultOptions = (input: string) => [
        {
            label: 'Search',
            options: [{ label: input, value: input, isSearch: true }],
        },
    ];

    const callSearch = async (input: string) => {
        const res = await client.query<
            SEARCH_QUERY_RESULT,
            SEARCH_QUERY_VARIABLES
        >({
            query: SEARCH_QUERY,
            variables: { query: input },
            fetchPolicy: 'no-cache',
        });
        return res;
    };

    const searchFn = async (input: string) => {
        setLoading(true);
        const res: SearchGroup[] = getDefaultOptions(input);

        let { data } = await callSearch(input);

        const transformed = transformSearchResult(data, searchResultMapping);

        res.push(...transformed);
        setLoading(false);
        return res;
    };

    return <SearchPresenter loadResults={searchFn} loading={loading} />;
}

export default Search;

const searchResultMapping = {
    Song: (song: Song<any> & WithID): SearchOption => ({
        label: song.title,
        value: song._id,
    }),
    User: (user: User & WithID): SearchOption => ({
        label: user.username,
        value: user._id,
    }),
    Author: (author: Author & WithID): SearchOption => ({
        label: author.name,
        value: author._id,
    }),
    Chord: (chord: Chord): SearchOption => ({
        label: chord.name,
        value: chord.name,
    }),
};
