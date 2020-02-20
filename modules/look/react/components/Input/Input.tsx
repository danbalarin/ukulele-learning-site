import React, { ReactElement } from 'react';
import { Input as ChakraInput } from '@chakra-ui/core';

import { Sizes, Omit, Spacing } from '../../utils';

type Omitted = 'size';

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, Omitted> {
    size?: Sizes;
    pr?: Spacing;
}

function Input(props: InputProps): ReactElement {
    return <ChakraInput variant="outline" {...props} />;
}

export default Input;
