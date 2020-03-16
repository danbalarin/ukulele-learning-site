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
        const isLoading = boolean('Loading', false);

        return (
            <>
                <Button onClick={onOpen} variantColor="green">
                    Open
                </Button>
                <AuthenticationModal
                    isLoading={isLoading}
                    isOpen={isOpen}
                    onClose={onClose}
                    onLogin={action('login')}
                    onRegister={action('register')}
                />
            </>
        );
    })
    .add('With terms of service', () => {
        const { isOpen, onOpen, onClose } = useDisclosure();
        const isLoading = boolean('Loading', false);

        return (
            <>
                <Button onClick={onOpen} variantColor="green">
                    Open
                </Button>
                <AuthenticationModal
                    isLoading={isLoading}
                    isOpen={isOpen}
                    onClose={onClose}
                    onLogin={action('login')}
                    onRegister={action('register')}
                    termsAndConditionsElement={'Sample terms and conditions'}
                />
            </>
        );
    });
