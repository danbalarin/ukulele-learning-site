import React, { ReactElement, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import {
    Button,
    useDisclosure,
    Stack,
    ColorSwitch,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
    Icon,
} from '@uls/look-react';
import {
    useUserLocalQuery,
    useUserLocalMutation,
    AuthenticationModal,
} from '@uls/user-react';
import { useUserLogoutLocalMutation } from '@uls/user-react';

interface Props {}

function AuthenticationTopbar({}: Props): ReactElement {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const modalRef = useRef<any>();
    const { data } = useUserLocalQuery();
    const [writeUserLocal] = useUserLocalMutation();
    const [logoutUser] = useUserLogoutLocalMutation();

    const onLogin = (token: string) => {
        writeUserLocal({ variables: { token } });
        onClose();
    };

    const onRegister = (token: string) => {
        writeUserLocal({ variables: { token } });
        onClose();
    };

    const username = data?.user.username;

    return (
        <>
            <Stack inline={true} spacing={4} alignItems="center">
                <ColorSwitch size={'sm'} />
                {username ? (
                    <Logged username={username} onLogout={() => logoutUser()} />
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
    /**
     * Users username
     */
    username: string;

    /**
     * Callback called after user clicking on logout button
     */
    onLogout: () => void;
}

function Logged({ username, onLogout }: LoggedProps): ReactElement {
    const TextWrapper = styled.span`
        margin-left: 10px;
    `;

    return (
        <Menu>
            <MenuButton variant="link">{username}</MenuButton>
            <MenuList>
                <MenuGroup>
                    <Link to="/profile">
                        <MenuItem>
                            <Icon name="user" />
                            <TextWrapper children="Profile" />
                        </MenuItem>
                    </Link>
                </MenuGroup>
                <MenuGroup>
                    <MenuItem onClick={onLogout}>
                        <Icon name="sign-out-alt" />
                        <TextWrapper children="Sign out" />
                    </MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    );
}

export default AuthenticationTopbar;
