import React, { ReactElement } from 'react';

import { Navbar, Input, Button, useDisclosure } from '@uls/look-react';
import { AuthenticationModal } from '@uls/user-react';

interface Props {}

function Topbar({}: Props): ReactElement {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Navbar
                left={<h2>Logo</h2>}
                center={<Input />}
                right={
                    <Button
                        variant="outline"
                        variantColor="orange"
                        onClick={onOpen}
                    >
                        Login
                    </Button>
                }
            />
            <AuthenticationModal
                isOpen={isOpen}
                onClose={onClose}
                isRegister={false}
                onLoginSubmit={console.log}
                onRegisterSubmit={console.log}
            />
        </>
    );
}

export default Topbar;
