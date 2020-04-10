import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { GlobalStyle } from '../modules/look/react';

import { ThemeProvider } from '../modules/look/react';

const ThemeDecorator = storyFn => {

    return (
        <ApolloProvider client={{}}>
            <ThemeProvider>
                <GlobalStyle colorMode={'dark'} />
                <>{storyFn()}</>
            </ThemeProvider>
        </ApolloProvider>
    );
};

export default ThemeDecorator;
