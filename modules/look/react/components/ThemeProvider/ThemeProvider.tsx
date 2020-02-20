import React, { ReactElement } from 'react';
import {
    ThemeProvider as ChakraThemeProvider,
    CSSReset,
} from '@chakra-ui/core';

import theme from '../../theme';

interface Props {
    children: React.ReactNode;
}

function ThemeProvider({ children }: Props): ReactElement {
    return (
        <ChakraThemeProvider theme={theme}>
            <CSSReset />
            {children}
        </ChakraThemeProvider>
    );
}

export default ThemeProvider;
