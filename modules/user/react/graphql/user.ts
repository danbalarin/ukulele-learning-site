import gql from 'graphql-tag';
import { useMutation, useQuery, Resolver } from '@apollo/client';
import jwt from 'jsonwebtoken';

import { User } from '@uls/user-common';

type LoginVars = Pick<User, 'username' | 'password'>;

interface LoginData {
    token: string;
}

const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
        }
    }
`;

export const useLoginMutation = () =>
    useMutation<{ login: LoginData }, LoginVars>(LOGIN, {
        fetchPolicy: 'no-cache',
    });

type SignupVars = Pick<User, 'username' | 'password' | 'email'>;

interface SignupData {
    token: string;
}

const SIGNUP = gql`
    mutation signup($username: String!, $password: String!, $email: String!) {
        signup(username: $username, password: $password, email: $email) {
            token
        }
    }
`;

export const useSignupMutation = () =>
    useMutation<{ signup: SignupData }, SignupVars>(SIGNUP, {
        fetchPolicy: 'no-cache',
    });

interface UserLocalData extends Pick<User, 'username' | 'email' | 'role'> {
    token: string;
}

export const USER_LOCAL_QUERY = gql`
    {
        user @client {
            token
            username
            email
            role
        }
    }
`;

export type USER_LOCAL_QUERY_RETURN = { user: UserLocalData };

export const useUserLocalQuery = () => {
    return useQuery<USER_LOCAL_QUERY_RETURN>(USER_LOCAL_QUERY, {
        ssr: false,
        fetchPolicy: 'cache-only',
    });
};

export type USER_LOCAL_MUTATION_VARIABLES = { token: string };

export const USER_LOCAL_MUTATION = gql`
    mutation writeUser($token: String!) {
        writeUser(token: $token) @client
    }
`;

export const useUserLocalMutation = () => {
    return useMutation<null, USER_LOCAL_MUTATION_VARIABLES>(
        USER_LOCAL_MUTATION
    );
};

export const writeUserResolver: Resolver = async (
    _root: any,
    { token }: any,
    { cache }: any
) => {
    const user = jwt.decode(token) as User;
    const data = { user: {} };
    if (user) {
        data.user = {
            username: user.username,
            email: user.email,
            role: user.role,
            token,
        };
    }
    cache.writeQuery({
        query: USER_LOCAL_QUERY,
        data,
    });
    return null;
};

export const USER_LOGOUT_LOCAL_MUTATION = gql`
    mutation logoutUser {
        logoutUser @client
    }
`;

export const useUserLogoutLocalMutation = () => {
    return useMutation<null, null>(USER_LOGOUT_LOCAL_MUTATION);
};

export const logoutUserResolver: Resolver = async (
    _root: any,
    data: any,
    { cache }: any
) => {
    await cache.writeQuery({
        query: USER_LOCAL_QUERY,
        data: { user: {} },
    });
    return null;
};

export type USER_TOKEN_LOCAL_QUERY_RETURN = { user: { token: string } };

export const USER_TOKEN_LOCAL_QUERY = gql`
    {
        user @client {
            token
        }
    }
`;

export const clientMutations = {
    writeUser: writeUserResolver,
    logoutUser: logoutUserResolver,
};
