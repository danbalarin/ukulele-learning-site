import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Global } from '@emotion/core';

import { createGlobalStyle } from '../modules/look/react';
import { ThemeProvider } from '../modules/look/react';

const ThemeDecorator = storyFn => {
    return (
        <ApolloProvider client={{}}>
            <ThemeProvider>
                <Global styles={createGlobalStyle('dark')} />
                <>{storyFn()}</>
            </ThemeProvider>
        </ApolloProvider>
    );
};

export default ThemeDecorator;
