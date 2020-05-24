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
    _id: string;
    token: string;
}

export const USER_LOCAL_QUERY = gql`
    {
        user @client {
            _id
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

export type USER_LOCAL_MUTATION_VARIABLES = {
    token?: string;
    user?: User & { _id: string };
};

export const USER_LOCAL_MUTATION = gql`
    mutation writeUser($token: String, $user: UserUpdateById) {
        writeUser(token: $token, user: $user) @client
    }
`;

export const useUserLocalMutation = () => {
    return useMutation<null, USER_LOCAL_MUTATION_VARIABLES>(
        USER_LOCAL_MUTATION
    );
};

export const writeUserResolver: Resolver = async (
    _root: any,
    { token: argToken, user: argUser }: any,
    { cache }: any
) => {
    let user;
    let token;
    if (!!argToken) {
        user = jwt.decode(argToken) as User & { _id: string };
        token = argToken;
    } else {
        user = argUser;
        const localData = await cache.readQuery({
            query: USER_LOCAL_QUERY,
        });
        token = localData?.user?.token;
    }
    const data = { user: {} };
    if (user) {
        data.user = {
            _id: user._id,
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

export interface USER_MANY_VARIABLES {
    filter?: { name: string };
}

export interface USER_MANY_RETURN {
    userMany: (User & { _id: string })[];
}

export const USER_MANY = gql`
    query usersMany($filter: FilterFindManyUserInput) {
        userMany(filter: $filter) {
            username
            email
            role
            _id
        }
    }
`;

export const useUserMany = (variables: USER_MANY_VARIABLES) =>
    useQuery<USER_MANY_RETURN, USER_MANY_VARIABLES>(USER_MANY, { variables });

export interface USER_UPDATE_BY_ID_VARIABLES {
    record: { _id: string } & Partial<User>;
}

export interface USER_UPDATE_BY_ID_RETURN {
    userUpdateById: { record: User & { _id: string } };
}

export const USER_UPDATE_BY_ID = gql`
    mutation userUpdateById($record: UpdateByIdUserInput!) {
        userUpdateById(record: $record) {
            record {
                username
                email
                role
                _id
            }
        }
    }
`;

export const useUserUpdateById = () =>
    useMutation<USER_UPDATE_BY_ID_RETURN, USER_UPDATE_BY_ID_VARIABLES>(
        USER_UPDATE_BY_ID
    );

export const clientMutations = {
    writeUser: writeUserResolver,
    logoutUser: logoutUserResolver,
};

export interface USER_UPDATE_ME_VARIABLES {
    record: Partial<User>;
}

export interface USER_UPDATE_ME_RETURN {
    userUpdateMe: User & { _id: string };
}

export const USER_UPDATE_ME = gql`
    mutation userUpdateMe($record: UserInput!) {
        userUpdateMe(record: $record) {
            username
            email
            role
            _id
        }
    }
`;

export const useUserUpdateMe = () =>
    useMutation<USER_UPDATE_ME_RETURN, USER_UPDATE_ME_VARIABLES>(
        USER_UPDATE_ME
    );
