import React, { ReactElement } from 'react';
import { persistCache } from 'apollo-cache-persist';

import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    createHttpLink,
    ApolloLink,
    from,
} from '@apollo/client';
import { clientMutations } from '@uls/user-react';
import { LocalStorage } from '../utils/LocaStorage';

const createLinks = () => {
    const authLink = new ApolloLink((operation, forward) => {
        const token = localStorage.getItem('token');
        token &&
            operation.setContext(({ headers }: any) => ({
                headers: {
                    ...headers,
                    authorization: token,
                },
            }));
        return forward(operation).map(res => {
            const token = res.data?.login?.token || res.data?.signup?.token; // TODO temp hack
            if (token) {
                localStorage.setItem('token', token as string);
            }
            return res;
        });
    });

    const httpLink = createHttpLink({
        uri: process.env.API_URL,
        fetch: fetch as any,
    });

    return from([authLink, httpLink]);
};

const createCache = () => {
    const cache = new InMemoryCache();
    persistCache({
        cache,
        storage: new LocalStorage(),
    });

    return cache;
};

interface Props {
    children: React.ReactNode;
}

const createApolloClientApp = () => {
    const cache = createCache();
    const link = createLinks();

    return function ApolloClientApp({ children }: Props): ReactElement {
        const client = new ApolloClient({
            cache,
            link,
            resolvers: {
                Mutation: {
                    ...clientMutations,
                },
            },
        });

        return <ApolloProvider client={client} children={children} />;
    };
};

export default createApolloClientApp;
