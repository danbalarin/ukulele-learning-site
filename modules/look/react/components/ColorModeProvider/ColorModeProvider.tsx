import React, { ReactElement } from 'react';

import { ColorModeProvider as ChakraColorModeProvider } from '@chakra-ui/core';

interface Props {
    children: React.ReactNode;
    value: 'light' | 'dark';
}

function ColorModeProvider(props: Props): ReactElement {
    return <ChakraColorModeProvider {...props} />;
}

export default ColorModeProvider;
