import React, { ReactElement } from 'react';

import { AsyncSelect, SelectActionMeta } from '../AsyncSelect';

export interface SearchOption {
    label: string;
    value: string;
    isSearch?: boolean;
    pathPrefix?: string;
}

export interface SearchGroup {
    label: string;
    options: SearchOption[];
}

interface Props {
    /**
     * Function that returns result groups
     */
    loadResults: (searchTerm: string) => Promise<SearchGroup[]>;

    /**
     * Callback function called after change
     */
    onChange: (value: SearchOption, action: SelectActionMeta) => void;

    /**
     * Placeholder in input
     */
    placeholder?: string;

    /**
     * Is loading flag
     */
    loading?: boolean;
}

function SearchInput({
    loadResults,
    onChange,
    placeholder,
    loading,
}: Props): ReactElement {
    return (
        <AsyncSelect<any>
            onChange={(value, action) =>
                value && onChange(value as SearchOption, action)
            }
            clearOnChange={true}
            loadOptions={loadResults}
            placeholder={placeholder || 'Search...'}
            loading={loading}
            noOptionsMessage={text => 'Start typing'}
        />
    );
}

export default SearchInput;
