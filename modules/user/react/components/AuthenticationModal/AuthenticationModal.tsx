import React, { ReactElement, useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';

import { Modal, Button } from '@uls/look-react';
import { LoginForm } from '../LoginForm';
import { RegisterForm } from '../RegisterForm';
import { User } from '@uls/user-common';

interface AuthenticationModalProps {
    isOpen?: boolean;
    isRegister?: boolean;
    onClose?: () => void;
    onLoginSubmit: (user: User) => void;
    onRegisterSubmit: (user: User) => void;
    isLoading?: boolean;
    termsAndConditionsElement?: React.ReactNode;
}

function AuthenticationModal({
    isRegister,
    onLoginSubmit,
    onRegisterSubmit,
    isLoading,
    termsAndConditionsElement,
    onClose,
    ...props
}: AuthenticationModalProps): ReactElement {
    const [registerForm, setRegisterForm] = useState(isRegister);

    const toggleForm = () => {
        setRegisterForm(!registerForm);
    };

    const transitions = useTransition(registerForm, null, {
        // from: {
        //     opacity: 0,
        //     height: 0,
        // },
        // enter: [
        //     { opacity: 1 },
        //     { height: 'auto' },
        // ],
        // leave: [{ opacity: 0, position: 'absolute' }, { height: 0 }],
        from: {
            position: 'absolute',
            opacity: 0,
        },
        enter: {
            opacity: 1,
            position: 'relative',
        },
        leave: {
            position: 'absolute',
            opacity: 0,
        },
    });

    const closeCallback = () => {
        setRegisterForm(isRegister);
        onClose && onClose();
    };

    return (
        <Modal
            {...props}
            onClose={closeCallback}
            header={registerForm ? 'Register' : 'Login'}
            footer={
                <ModalFooter
                    isRegister={registerForm || false}
                    onLoginClick={toggleForm}
                    onRegisterClick={toggleForm}
                    isLoading={isLoading}
                />
            }
        >
            {transitions.map(({ item, key, props }) =>
                item ? (
                    <animated.div style={props} key="register">
                        {' '}
                        <RegisterForm
                            onSubmit={onRegisterSubmit}
                            isLoading={isLoading}
                            termsAndConditionsElement={
                                termsAndConditionsElement
                            }
                        />
                    </animated.div>
                ) : (
                    <animated.div style={props} key="login">
                        <LoginForm
                            onSubmit={onLoginSubmit}
                            isLoading={isLoading}
                        />
                    </animated.div>
                )
            )}
            {/* {registerForm ? (
                <RegisterForm
                    onSubmit={onRegisterSubmit}
                    isLoading={isLoading}
                    termsAndConditionsElement={termsAndConditionsElement}
                />
            ) : (
                <LoginForm onSubmit={onLoginSubmit} isLoading={isLoading} />
            )} */}
        </Modal>
    );
}

interface ModalFooterProps {
    isRegister: boolean;
    onLoginClick?: () => void;
    onRegisterClick?: () => void;
    isLoading?: boolean;
}

function ModalFooter({
    isRegister,
    onLoginClick,
    onRegisterClick,
    isLoading,
}: ModalFooterProps): ReactElement {
    return isRegister ? (
        <Button variant="link" onClick={onLoginClick} disabled={isLoading}>
            Already have an account?
        </Button>
    ) : (
        <Button variant="link" onClick={onRegisterClick} disabled={isLoading}>
            Dont have an account?
        </Button>
    );
}

export default AuthenticationModal;
