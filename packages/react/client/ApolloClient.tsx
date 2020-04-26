import React, { ReactElement } from 'react';
import { persistCache } from 'apollo-cache-persist';
import jwt from 'jsonwebtoken';

import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    createHttpLink,
    ApolloLink,
    from,
} from '@apollo/client';
import {
    clientMutations,
    USER_TOKEN_LOCAL_QUERY,
    USER_TOKEN_LOCAL_QUERY_RETURN,
} from '@uls/user-react';

import { LocalStorage } from '../utils/LocaStorage';

const createLinks = () => {
    const authLink = new ApolloLink((operation, forward) => {
        const {
            cache,
        }: { cache: InMemoryCache } = operation.getContext() as any;
        let data;
        try {
            data = cache.readQuery<USER_TOKEN_LOCAL_QUERY_RETURN>({
                query: USER_TOKEN_LOCAL_QUERY,
            });
        } catch (err) {}

        const token = data?.user.token;
        if (token) {
            const { exp } = jwt.decode(token) as { [key: string]: any };
            if (Date.now() < exp * 1000) {
                operation.setContext(({ headers }: any) => ({
                    headers: {
                        ...headers,
                        Authorization: token,
                    },
                }));
            } else {
                // const toast = useToast();
                // toast({
                //     title: 'Expired token',
                //     description: 'Your token has expired, please login.',
                //     duration: 1000,
                //     status: 'error',
                // });
                clientMutations.logoutUser(null, null, { cache });
            }
        }
        return forward(operation);
        // .map(res => {
        //     const token = res.data?.login?.token || res.data?.signup?.token; // TODO temp hack
        //     if (token) {
        //         clientMutations.writeUser(null, { token }, { cache });
        //     }
        //     return res;
        // });
    });

    const httpLink = createHttpLink({
        uri: process.env.API_URL,
        fetch: fetch as any,
    });

    return from([authLink, httpLink]);
};

const createCache = async () => {
    const cache = new InMemoryCache();
    await persistCache({
        cache,
        storage: new LocalStorage(),
    });

    return cache;
};

interface Props {
    children: React.ReactNode;
}

const createApolloClientApp = async () => {
    const cache = await createCache();
    const link = createLinks();

    return function ApolloClientApp({ children }: Props): ReactElement {
        const client = new ApolloClient({
            connectToDevTools: true,
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
