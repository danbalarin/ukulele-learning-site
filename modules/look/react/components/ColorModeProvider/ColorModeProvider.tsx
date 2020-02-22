import React, { ReactElement } from 'react';

import {
    ColorModeProvider as ChakraColorModeProvider,
    useColorMode as useChakraColorMode,
} from '@chakra-ui/core';

interface Props {
    children: React.ReactNode;
}

function ColorModeProvider(props: Props): ReactElement {
    return <ChakraColorModeProvider {...props} />;
}

export interface UseColorMode {
    colorMode: 'light' | 'dark';
    toggleColorMode: () => void;
}
export const useColorMode: () => UseColorMode = useChakraColorMode;

export default ColorModeProvider;
