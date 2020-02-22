import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { useDisclosure, Button } from '@uls/look-react';

import AuthenticationModal from './AuthenticationModal';

storiesOf('User/Authentication modal', module)
    .addDecorator(withKnobs)
    .add('Basic', () => {
        const { isOpen, onOpen, onClose } = useDisclosure();
        const isRegister = boolean('Register form', false);
        const isLoading = boolean('Loading', false);

        return (
            <>
                <Button onClick={onOpen} variantColor="green">
                    Open
                </Button>
                <AuthenticationModal
                    isRegister={isRegister}
                    isOpen={isOpen}
                    onClose={onClose}
                    onLoginSubmit={action('login')}
                    onRegisterSubmit={action('register')}
                />
            </>
        );
    })
    .add('With terms of service', () => {
        const { isOpen, onOpen, onClose } = useDisclosure();
        const isRegister = boolean('Register form', true);
        const isLoading = boolean('Loading', false);

        return (
            <>
                <Button onClick={onOpen} variantColor="green">
                    Open
                </Button>
                <AuthenticationModal
                    isRegister={isRegister}
                    isOpen={isOpen}
                    onClose={onClose}
                    onLoginSubmit={action('login')}
                    onRegisterSubmit={action('register')}
                    isLoading={isLoading}
                    termsAndConditionsElement={'Sample terms and conditions'}
                />
            </>
        );
    });