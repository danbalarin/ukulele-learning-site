import React, { ReactElement } from 'react';

import { Editable as ChakraEditable } from '@chakra-ui/core';
import { EditablePreview } from './EditablePreview';
import { EditableInput } from './EditableInput';

interface Props
    extends Pick<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    value?: string;
    onSubmit?: () => void;
}

function Editable({ value, onSubmit, type }: Props): ReactElement {
    return (
        <ChakraEditable onSubmit={onSubmit} defaultValue={value}>
            <EditablePreview />
            <EditableInput type={type} />
        </ChakraEditable>
    );
}

export default Editable;
