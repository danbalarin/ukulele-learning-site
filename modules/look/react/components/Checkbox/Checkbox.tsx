import React, { ReactElement } from 'react';

import { Checkbox as ChakraCheckbox } from '@chakra-ui/core';
import { Sizes, Omit } from '../../utils';

type Omitted = 'size';

interface Props
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, Omitted> {
    size?: Sizes;
    variantColor?: string;
    value?: string | number;
    children: React.ReactNode;
    alignSelf?: 'center' | 'start' | 'end';
}

function Checkbox({ disabled, ...props }: Props): ReactElement {
    return <ChakraCheckbox {...props} isDisabled={disabled} />;
}

export default Checkbox;
