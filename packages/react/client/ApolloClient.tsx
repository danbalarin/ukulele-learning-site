import React, { ReactElement } from 'react';
import { persistCache } from 'apollo-cache-persist';

import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    HttpLink,
    ApolloLink,
    from,
} from '@apollo/client';
import { clientMutations } from '@uls/user-react';

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

const httpLink = new HttpLink({
    credentials: 'same-origin',
    uri: process.env.API_URL,
});

const cache = new InMemoryCache();

class LocalStorage {
    getItem(key: string): string | null {
        return sessionStorage.getItem(key);
    }

    setItem(key: string, value?: any) {
        value && sessionStorage.setItem(key, value);
    }

    removeItem(key: string) {
        sessionStorage.removeItem(key);
    }
}

persistCache({
    cache,
    storage: new LocalStorage(),
});

interface Props {
    children: React.ReactNode;
}

function ApolloClientApp({ children }: Props): ReactElement {
    const client = new ApolloClient({
        cache: cache,
        link: from([authLink, httpLink]),
        resolvers: {
            Mutation: {
                ...clientMutations,
            },
        },
    });

    return <ApolloProvider client={client} children={children} />;
}

export default ApolloClientApp;
