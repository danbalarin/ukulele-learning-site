import React, { ReactElement } from 'react';
import { Stack as ChakraStack } from '@chakra-ui/core';

interface Props {
    children: React.ReactNode;
    spacing?: number;
    inline?: boolean;
    alignItems?: string; // todo check value
}

function Stack({ inline, ...props }: Props): ReactElement {
    return <ChakraStack {...props} isInline={inline} />;
}

export default Stack;
