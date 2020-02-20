import React, { ReactElement } from 'react';
import { useFormik } from 'formik';

import { User } from '@uls/user-common';
import { PasswordInput, Input, Button, Stack } from '@uls/look-react';

interface Props {
    onSubmit: (user: User) => void;
    isLoading?: boolean;
}

function LoginForm({ onSubmit, isLoading }: Props): ReactElement {
    const { handleSubmit, handleChange, values } = useFormik({
        initialValues: {
            username: '',
            password: '',
            email: '',
        },
        onSubmit: values => {
            onSubmit(values as User);
        },
    });

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
                <Input
                    name="username"
                    placeholder="Username"
                    disabled={isLoading}
                    onChange={handleChange}
                    value={values.username}
                />
                <PasswordInput
                    name="password"
                    placeholder="Password"
                    disabled={isLoading}
                    onChange={handleChange}
                    value={values.password}
                />
                <Button variantColor="blue" type="submit" isLoading={isLoading}>
                    Login
                </Button>
            </Stack>
        </form>
    );
}

export default LoginForm;
