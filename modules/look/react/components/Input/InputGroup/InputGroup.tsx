import React, { ReactElement } from 'react';
import { InputGroup as ChakraInputGroup } from '@chakra-ui/core';

import { Sizes } from '../../../utils';

interface Props {
    children: React.ReactNode;
    size?: Sizes;
}

function InputGroup({ children, ...props }: Props): ReactElement {
    return <ChakraInputGroup {...props}>{children}</ChakraInputGroup>;
}

export default InputGroup;
