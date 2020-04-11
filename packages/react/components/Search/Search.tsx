import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

import { SearchInput, SearchOption } from '@uls/look-react';

const searchFn = async (input: string) => [
    {
        label: 'Search',
        options: [{ label: input, value: input, isSearch: true }],
    },
    {
        label: 'Songs',
        options: [
            {
                label: 'Riptide - Joy Vance',
                value: 'riptide-joy-vance',
                pathPrefix: '/song/',
            },
        ],
    },
];

interface Props {}

function Search({}: Props): ReactElement {
    let history = useHistory();

    const searchRedirect = (value: string) =>
        history.push({ pathname: '/search', search: `?query=${value}` });

    const valueRedirect = (value: string) => history.push(value);

    const handleChange = (value: SearchOption) => {
        if (value.isSearch) {
            searchRedirect(value.value);
        } else {
            valueRedirect(`${value.pathPrefix}${value.value}`);
        }
    };

    return <SearchInput loadResults={searchFn} onChange={handleChange} />;
}

export default Search;
