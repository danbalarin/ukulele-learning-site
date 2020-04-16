import React, { ReactElement, useState } from 'react';
import { useApolloClient } from '@apollo/client';

import { SearchGroup, SearchOption } from '@uls/look-react';

import SearchPresenter from './SearchPresenter';
import {
    SEARCH_QUERY,
    SEARCH_QUERY_RESULT,
    SEARCH_QUERY_VARIABLES,
} from '../../graphql/search';

interface GroupMapping {
    label: string;
    pathPrefix: string;
    limit: number;
    order: number;
}

const groupsMapping: {
    [key: string]: GroupMapping;
} = {
    Song: { label: 'Song', pathPrefix: 'song/', limit: 3, order: 0 },
    User: { label: 'User', pathPrefix: 'user/', limit: 3, order: 10 },
    Author: { label: 'Author', pathPrefix: 'author/', limit: 3, order: 2 },
    Chord: { label: 'Chord', pathPrefix: 'chord/', limit: 3, order: 1 },
};

const transformGroups = (groups: SearchGroup[]): SearchGroup[] => {
    const reduceOptions = (mapping: GroupMapping) => (
        result: SearchOption[],
        option: SearchOption,
        index: number
    ) => {
        if (index < mapping?.limit) {
            result.push({ ...option, pathPrefix: mapping?.pathPrefix });
        }
        return result;
    };

    const mapGroups = (group: SearchGroup): SearchGroup => ({
        label: groupsMapping[group.label]?.label,
        options: group.options.reduce(
            reduceOptions(groupsMapping[group.label]),
            []
        ),
    });

    return groups
        .map(mapGroups)
        .sort(
            (a, b) =>
                groupsMapping[a.label].order - groupsMapping[b.label].order
        );
};

interface Props {}

function Search({}: Props): ReactElement {
    const client = useApolloClient();
    const [loading, setLoading] = useState(false);

    const searchFn = async (input: string) => {
        setLoading(true);
        const res: SearchGroup[] = [
            {
                label: 'Search',
                options: [{ label: input, value: input, isSearch: true }],
            },
        ];

        let data: any;
        try {
            data = await client.query<
                SEARCH_QUERY_RESULT,
                SEARCH_QUERY_VARIABLES
            >({
                query: SEARCH_QUERY,
                variables: { query: input },
            });
        } catch (err) {}

        if (data?.data?.search?.length > 0) {
            console.log(data.data.search);
            const transformed = transformGroups(data.data.search);
            res.push(...transformed);
        }
        setLoading(false);
        return res;
    };

    return <SearchPresenter loadResults={searchFn} loading={loading} />;
}

export default Search;
