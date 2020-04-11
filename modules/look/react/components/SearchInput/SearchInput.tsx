import React, { ReactElement, useState, useRef } from 'react';
import { ActionMeta } from 'react-select';
import AsyncSelect from 'react-select/async';

import { useColorMode } from '../../hooks/useColorMode';
import Theme from '../../theme';

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
    onChange: (value: SearchOption, action: ActionMeta) => void;

    /**
     * Placeholder in input
     */
    placeholder?: string;

    /**
     * Is loading flag
     */
    loading?: boolean;
}

const bg = {
    light: Theme.colors.gray['100'],
    dark: Theme.colors.whiteAlpha['50'],
};

function SearchInput({
    loadResults,
    onChange,
    placeholder,
    loading,
}: Props): ReactElement {
    const { colorMode } = useColorMode();
    const [value, setValue] = useState<string>('');
    const selectRef = useRef<any>();

    const createContainerStyles = (provided: any, state: any) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return {
            ...provided,
            opacity,
            transition,
            width: '100%',
        };
    };

    const createControlStyles = (provided: any, state: any) => {
        return {
            ...provided,
            backgroundColor: bg[colorMode],
            borderColor: 'transparent',
        };
    };

    const createInputStyles = (provided: any, state: any) => {
        return {
            ...provided,
            color: Theme?.modes?.[colorMode]?.color,
        };
    };

    return (
        <AsyncSelect
            instanceId={onChange.toString()}
            components={{ DropdownIndicator: null, IndicatorSeparator: null }}
            onInputChange={value => setValue(value)}
            onChange={(value, action) => {
                value && onChange(value as SearchOption, action);
                setValue('');
                console.log(selectRef);
            }}
            isMulti={false}
            inputValue={value}
            isClearable={true}
            loadOptions={loadResults}
            placeholder={placeholder || 'Search...'}
            // defaultValue={{ label: '', value: '' }}
            isLoading={loading}
            styles={{
                container: createContainerStyles,
                control: createControlStyles,
                input: createInputStyles,
                singleValue: createInputStyles,
            }}
            ref={selectRef}
        />
    );
}

export default SearchInput;
