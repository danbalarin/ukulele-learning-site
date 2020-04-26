import React, {
    ReactElement,
    useState,
    forwardRef,
    useImperativeHandle,
} from 'react';
import { useTransition, animated } from 'react-spring';

import { Modal, Button } from '@uls/look-react';

import { LoginForm } from '../LoginForm';
import { RegisterForm } from '../RegisterForm';

interface AuthenticationModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    onLogin: (token: string) => void;
    onRegister: (token: string) => void;
    isLoading?: boolean;
    termsAndConditionsElement?: React.ReactNode;
}

function AuthenticationModal(
    {
        onLogin,
        onRegister,
        isLoading,
        termsAndConditionsElement,
        onClose,
        ...props
    }: AuthenticationModalProps,
    ref: any
): ReactElement {
    const [registerForm, setRegisterForm] = useState(false);

    const transitions = useTransition(registerForm, null, {
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

    useImperativeHandle(ref, () => ({
        setLogin: () => {
            setRegisterForm(false);
        },
        setRegister: () => {
            setRegisterForm(true);
        },
    }));

    const closeCallback = () => {
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
                    onLoginClick={() => {
                        setRegisterForm(false);
                    }}
                    onRegisterClick={() => {
                        setRegisterForm(true);
                    }}
                    isLoading={isLoading}
                />
            }
        >
            {transitions.map(({ item, key, props }) =>
                item ? (
                    <animated.div style={props} key="register">
                        <RegisterForm
                            onRegister={onRegister}
                            isLoading={isLoading}
                            termsAndConditionsElement={
                                termsAndConditionsElement
                            }
                        />
                    </animated.div>
                ) : (
                    <animated.div style={props} key="login">
                        <LoginForm onLogin={onLogin} isLoading={isLoading} />
                    </animated.div>
                )
            )}
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

export default forwardRef(AuthenticationModal);
