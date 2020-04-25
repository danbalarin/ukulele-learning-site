import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

import { SearchInput, SearchOption, SearchGroup } from '@uls/look-react';

interface Props {
    loadResults: (searchTerm: string) => Promise<SearchGroup[]>;

    keyName: string;

    loading?: boolean;
}

function SearchPresenter({
    loadResults,
    loading,
    keyName,
}: Props): ReactElement {
    let history = useHistory();

    const searchRedirect = (value: string) =>
        history.push({ pathname: '/search', search: `?query=${value}` });

    const valueRedirect = (value: string) => history.push(value);

    const handleChange = (value: SearchOption) => {
        if (value.isSearch) {
            searchRedirect(value.value);
        } else {
            valueRedirect(value.value);
        }
    };
    return (
        <SearchInput
            keyName={keyName}
            loadResults={loadResults}
            onChange={handleChange}
            loading={loading}
        />
    );
}

export default SearchPresenter;
