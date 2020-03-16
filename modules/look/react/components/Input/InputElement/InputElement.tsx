import React, { ReactElement } from 'react';
import { InputRightElement, InputLeftElement } from '@chakra-ui/core';
import { Spacing } from '../../../utils';

interface Props {
    alignment: 'left' | 'right';
    children: React.ReactNode;
    width?: Spacing;
}

function InputElement({ alignment, ...props }: Props): ReactElement {
    return alignment === 'left' ? (
        <InputLeftElement {...props} />
    ) : (
        <InputRightElement {...props} />
    );
}

export default InputElement;
