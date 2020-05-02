import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { Global } from '@emotion/core';

import {
    ThemeProvider,
    ColorModeProvider,
    CSSReset,
    createGlobalStyle,
    useColorMode,
    inlineCSS,
} from '../modules/look/react';

const ThemeDecorator = storyFn => {
    const { colorMode } = useColorMode();

    return (
        <MockedProvider>
            <ThemeProvider>
                <ColorModeProvider value="light">
                    <CSSReset />
                    <Global styles={createGlobalStyle(colorMode, true)} />
                    <Global styles={inlineCSS} />
                    {storyFn()}
                </ColorModeProvider>
            </ThemeProvider>
        </MockedProvider>
    );
};

export default ThemeDecorator;
