import gql from 'graphql-tag';
import { useMutation, useQuery, Resolver } from '@apollo/client';
import jwt from 'jsonwebtoken';

import { User } from '@uls/user-common';

type LoginVars = Pick<User, 'username' | 'password'>;

interface LoginData {
    token: string;
}

const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
        }
    }
`;

export const useLoginMutation = () =>
    useMutation<{ login: LoginData }, LoginVars>(LOGIN);

type SignupVars = Pick<User, 'username' | 'password' | 'email'>;

interface SignupData {
    token: string;
}

const SIGNUP = gql`
    mutation Signup($username: String!, $password: String!, $email: String!) {
        signup(username: $username, password: $password, email: $email) {
            token
        }
    }
`;

export const useSignupMutation = () =>
    useMutation<{ signup: SignupData }, SignupVars>(SIGNUP);

interface UserLocalData extends Pick<User, 'username' | 'email' | 'role'> {
    token: string;
}

const USER_LOCAL_QUERY = gql`
    {
        user @client {
            token
            username
            email
            role
        }
    }
`;

export const useUserLocalQuery = () => {
    return useQuery<{ user: UserLocalData }>(USER_LOCAL_QUERY, { ssr: false });
};

const USER_LOCAL_MUTATION = gql`
    mutation writeUser($token: String!) {
        writeUser(token: $token) @client
    }
`;

export const useUserLocalMutation = () => {
    return useMutation<null, { token: string }>(USER_LOCAL_MUTATION);
};

export const writeUserMutation: Resolver = async (
    _root: any,
    { token }: any,
    { cache }: any
) => {
    const user = jwt.decode(token) as User;
    cache.writeQuery({
        query: USER_LOCAL_QUERY,
        data: {
            user: {
                username: user.username,
                email: user.email,
                role: user.role,
                token,
            },
        },
    });
    return null;
};
