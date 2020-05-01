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
    IconName,
    Theme,
    useColorMode,
} from '@uls/look-react';
import {
    useUserLocalQuery,
    useUserLocalMutation,
    AuthenticationModal,
} from '@uls/user-react';
import { useUserLogoutLocalMutation } from '@uls/user-react';
import { Role } from '@uls/auth-common';

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

    return (
        <>
            <Stack inline={true} spacing={4} alignItems="center">
                <ColorSwitch size={'sm'} />
                {data ? (
                    <Logged
                        username={data.user.username}
                        onLogout={() => logoutUser()}
                        role={data.user.role}
                    />
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
     * User's username
     */
    username: string;

    /**
     * Callback called after user clicking on logout button
     */
    onLogout: () => void;

    /**
     * User's role
     */
    role: Role;
}

function Logged({ username, onLogout, role }: LoggedProps): ReactElement {
    const { colorMode } = useColorMode();
    const IconWrapper = styled.span`
        width: 30px;
        border-right: 1px solid ${Theme.modes?.[colorMode].color};
    `;
    const TextWrapper = styled.span`
        margin-left: 10px;
    `;

    const adminGroup = [
        role >= Role.MODERATOR && {
            link: '/admin/author',
            icon: 'microphone-alt',
            text: 'Authors',
        },
        role >= Role.MODERATOR && {
            link: '/admin/song',
            icon: 'music',
            text: 'Songs',
        },
        role >= Role.ADMIN && {
            link: '/admin/users',
            icon: 'users',
            text: 'Users',
        },
    ];

    return (
        <Menu>
            <MenuButton variant="link">{username}</MenuButton>
            <MenuList>
                <MenuGroup>
                    <Link to="/profile">
                        <MenuItem>
                            <IconWrapper>
                                <Icon name="user" />
                            </IconWrapper>
                            <TextWrapper children="Profile" />
                        </MenuItem>
                    </Link>
                </MenuGroup>
                <MenuGroup>
                    <MenuItem onClick={onLogout}>
                        <IconWrapper>
                            <Icon name="sign-out-alt" />
                        </IconWrapper>
                        <TextWrapper children="Sign out" />
                    </MenuItem>
                </MenuGroup>
                {role >= Role.MODERATOR ? (
                    <MenuGroup title="Administration">
                        {adminGroup.map(
                            data =>
                                data && (
                                    <Link to={data.link} key={data.link}>
                                        <MenuItem>
                                            <IconWrapper>
                                                <Icon
                                                    name={data.icon as IconName}
                                                />
                                            </IconWrapper>
                                            <TextWrapper children={data.text} />
                                        </MenuItem>
                                    </Link>
                                )
                        )}
                    </MenuGroup>
                ) : (
                    <></>
                )}
            </MenuList>
        </Menu>
    );
}

export default AuthenticationTopbar;
