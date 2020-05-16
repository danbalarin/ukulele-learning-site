import React, { ReactElement, useState } from 'react';
import { ActionMeta, ValueType } from 'react-select';
import Async from 'react-select/async';
import { useColorMode } from '../../hooks/useColorMode';
import customTheme from '../../theme';

export type SelectValueType<T> = ValueType<T>;
export type SelectActionMeta<T> = ActionMeta<T>;

interface PropsGeneral {
    /**
     * Unique identifier
     */
    keyName: string;

    /**
     * Is loading flag
     */
    loading?: boolean;

    /**
     * Placeholder in input
     */
    placeholder?: string;

    /**
     * Flag whether to automatically clear after select
     */
    clearOnChange?: boolean;

    /**
     * Called when no options are provided
     */
    noOptionsMessage?: ({ inputValue }: { inputValue: string }) => string;

    /**
     * Disabled flag
     */
    disabled?: boolean;
}

interface PropsSingle<T> extends PropsGeneral {
    /**
     * Function used to asynchronously load data
     *
     * @param input text inserted in select
     */
    loadOptions: (input: string) => Promise<T[]>;

    /**
     * Callback function called after change
     *
     * @param value value that got changed
     * @param action change action
     */
    onChange: (value: T, action: SelectActionMeta<T>) => void;

    /**
     * Multi select flag
     */
    multi: false | undefined;

    /**
     * Pass value to have controlled select
     */
    value?: T;
}

interface PropsMulti<T> extends PropsGeneral {
    /**
     * Function used to asynchronously load data
     *
     * @param input text inserted in select
     */
    loadOptions: (input: string) => Promise<T[]>;

    /**
     * Callback function called after change
     *
     * @param value value that got changed
     * @param action change action
     */
    onChange: (value: T[], action: SelectActionMeta<T>) => void;

    /**
     * Multi select flag
     */
    multi: true;

    /**
     * Pass value to have controlled select
     */
    value?: T[];
}

const bg = {
    light: customTheme.colors.gray['100'],
    dark: customTheme.colors.whiteAlpha['50'],
};

/**
 * Select with asynchronous loading
 *
 * @param param0 options
 */
function AsyncSelect<T>({
    loadOptions,
    onChange,
    clearOnChange,
    placeholder,
    loading,
    noOptionsMessage,
    keyName,
    multi,
    value,
    disabled,
}: PropsSingle<T> | PropsMulti<T>): ReactElement {
    const { colorMode } = useColorMode();
    const [inputValue, setInputValue] = useState<string>('');

    const onChangeWrapped = (
        value: SelectValueType<T>,
        action: SelectActionMeta<T>
    ) => {
        if (clearOnChange) {
            setInputValue('');
        }

        onChange(value as T & T[], action as SelectActionMeta<T & T[]>);
    };

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
            color: customTheme?.modes?.[colorMode]?.color,
        };
    };

    return (
        <Async
            isDisabled={disabled}
            instanceId={keyName}
            loadOptions={loadOptions}
            onChange={onChangeWrapped}
            onInputChange={value => setInputValue(value)}
            inputValue={inputValue}
            styles={{
                container: createContainerStyles,
                control: createControlStyles,
                input: createInputStyles,
                singleValue: createInputStyles,
            }}
            isMulti={multi}
            isClearable={true}
            placeholder={placeholder || 'Search...'}
            isLoading={loading}
            noOptionsMessage={
                noOptionsMessage ? noOptionsMessage : () => 'Start typing'
            }
            value={value}
            components={{ DropdownIndicator: null, IndicatorSeparator: null }}
        />
    );
}

export default AsyncSelect;
