import React, { ReactElement } from 'react';
import fetch from 'node-fetch';
import {
    createHttpLink,
    InMemoryCache,
    ApolloProvider,
    ApolloClient,
} from '@apollo/client';

interface Props {
    children: React.ReactNode;
}

function ApolloServer({ children }: Props): ReactElement {
    const client = new ApolloClient({
        link: createHttpLink({
            uri: process?.env?.API_URL,
            fetch: fetch as any,
        }),
        ssrMode: false,
        cache: new InMemoryCache(),
    });

    return <ApolloProvider client={client} children={children} />;
}

export default ApolloServer;
