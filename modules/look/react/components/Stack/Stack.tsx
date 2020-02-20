import React, { ReactElement } from 'react';
import { Stack as ChakraStack } from '@chakra-ui/core';

interface Props {
    children: React.ReactNode;
    spacing?: number;
}

function Stack({ children, ...props }: Props): ReactElement {
    return <ChakraStack {...props}>{children}</ChakraStack>;
}

export default Stack;
