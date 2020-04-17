import React, { ReactElement, useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';

import { Button, useDisclosure, Stack, ColorSwitch } from '@uls/look-react';

import {
    useUserLocalQuery,
    useUserLocalMutation,
    AuthenticationModal,
    USER_LOCAL_QUERY,
    USER_LOCAL_QUERY_RETURN,
    USER_TOKEN_LOCAL_QUERY_RETURN,
} from '@uls/user-react';

interface Props {}

function AuthenticationTopbar({}: Props): ReactElement {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [userData, setUserData] = useState<USER_LOCAL_QUERY_RETURN>();
    const client = useApolloClient();
    const modalRef = useRef<any>();
    const [writeUserLocal, { data }] = useUserLocalMutation();

    useEffect(() => {
        const sub = client
            .watchQuery<USER_LOCAL_QUERY_RETURN, null>({
                query: USER_LOCAL_QUERY,
            })
            .subscribe(data => {
                console.log(data);
                setUserData(data.data);
            });
        return () => {
            // sub.unsubscribe();
        };
    }, []);

    const onLogin = (token: string) => {
        client.resetStore();
        writeUserLocal({ variables: { token } });
        onClose();
    };

    const onRegister = (token: string) => {
        client.resetStore();
        writeUserLocal({ variables: { token } });
        onClose();
    };

    const username = userData?.user.username;

    return (
        <>
            <Stack inline={true} spacing={4} alignItems="center">
                <ColorSwitch size={'sm'} />
                {username ? (
                    <Logged username={username} />
                ) : (
                    <NotLogged onOpen={onOpen} modalRef={modalRef} />
                )}
            </Stack>
            <AuthenticationModal
                ref={modalRef}
                isOpen={isOpen}
                onClose={onClose}
                onLogin={onLogin}
                onRegister={onRegister}
            />
        </>
    );
}

interface NotLoggedProps {
    modalRef: React.MutableRefObject<any>;
    onOpen: () => void;
}

function NotLogged({ modalRef, onOpen }: NotLoggedProps): ReactElement {
    const openLogin = () => {
        modalRef && modalRef?.current?.setLogin();
        onOpen();
    };

    const openRegister = () => {
        modalRef && modalRef?.current?.setRegister();
        onOpen();
    };

    return (
        <Stack inline={true} spacing={4} alignItems="center">
            <Button variant="link" variantColor="pink" onClick={openRegister}>
                Sign up
            </Button>
            <Button variant="outline" variantColor="orange" onClick={openLogin}>
                Login
            </Button>
        </Stack>
    );
}

interface LoggedProps {
    username: string;
}

function Logged({ username }: LoggedProps): ReactElement {
    return (
        <Link to="/profile">
            <Button variant="link">{username}</Button>
        </Link>
    );
}

export default AuthenticationTopbar;
