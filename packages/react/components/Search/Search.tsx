import React, { ReactElement, useState } from 'react';
import gql from 'graphql-tag';
import { useApolloClient } from '@apollo/client';

import { SearchGroup, SearchOption } from '@uls/look-react';

import SearchPresenter from './SearchPresenter';

const SEARCH_QUERY = gql`
    query search($query: String!) {
        search(query: $query) {
            label
            options {
                label
                value
            }
        }
    }
`;
interface GroupMapping {
    label: string;
    pathPrefix: string;
    limit: number;
}

const groupsMapping: {
    [key: string]: GroupMapping;
} = {
    User: { label: 'User', pathPrefix: 'user/', limit: 3 },
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

    return groups.map(mapGroups);
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
                { search: SearchGroup[] },
                { query: string }
            >({
                query: SEARCH_QUERY,
                variables: { query: input },
            });
        } catch (err) {}

        if (data?.data?.search?.length > 0) {
            const transformed = transformGroups(data.data.search);
            res.push(...transformed);
        }
        console.log(res);
        setLoading(false);
        return res;
    };

    return <SearchPresenter loadResults={searchFn} loading={loading} />;
}

export default Search;
