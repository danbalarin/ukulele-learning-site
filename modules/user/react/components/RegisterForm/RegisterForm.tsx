import React, { ReactElement } from 'react';
import { useFormik } from 'formik';

import { User } from '@uls/user-common';
import {
    PasswordInput,
    Input,
    Button,
    Stack,
    Checkbox,
    FormControl,
    FormErrorMessage,
} from '@uls/look-react';

interface Props {
    onSubmit: (user: User) => void;
    isLoading?: boolean;
    termsAndConditionsElement?: React.ReactNode;
}

function RegisterForm({
    onSubmit,
    isLoading,
    termsAndConditionsElement,
}: Props): ReactElement {
    const { handleSubmit, handleChange, values } = useFormik({
        initialValues: {
            username: '',
            password: '',
            passwordMatch: '',
            email: '',
            terms: false,
        },
        onSubmit: values => {
            const user = { ...values };
            delete user.passwordMatch;
            delete user.terms;
            onSubmit(user as User);
        },
    });

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
                <FormControl isInvalid={true}>
                    <Input
                        name="username"
                        placeholder="Username"
                        disabled={isLoading}
                        onChange={handleChange}
                        value={values.username}
                    />
                    <FormErrorMessage>Oopsie</FormErrorMessage>
                </FormControl>
                <Input
                    name="email"
                    placeholder="Email"
                    type="email"
                    disabled={isLoading}
                    onChange={handleChange}
                    value={values.email}
                />
                <PasswordInput
                    name="password"
                    placeholder="Password"
                    disabled={isLoading}
                    onChange={handleChange}
                    value={values.password}
                />
                <PasswordInput
                    name="passwordMatch"
                    placeholder="Password again"
                    disabled={isLoading}
                    onChange={handleChange}
                    value={values.passwordMatch}
                />
                {termsAndConditionsElement && (
                    <Checkbox
                        name="terms"
                        disabled={isLoading}
                        onChange={handleChange}
                        value={values.passwordMatch}
                        children={termsAndConditionsElement}
                        alignSelf="center"
                    />
                )}

                <Button
                    variantColor="blue"
                    type="submit"
                    variant="outline"
                    isLoading={isLoading}
                >
                    Login
                </Button>
            </Stack>
        </form>
    );
}

export default RegisterForm;
