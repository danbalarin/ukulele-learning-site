import React, { ReactElement } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { User } from '@uls/user-common';
import {
    PasswordInput,
    Input,
    Button,
    Stack,
    FormControl,
    FormErrorMessage,
} from '@uls/look-react';

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

interface Props {
    onSubmit: (user: User) => void;
    isLoading?: boolean;
}

function LoginForm({ onSubmit, isLoading }: Props): ReactElement {
    const { handleSubmit, handleChange, values, touched, errors } = useFormik({
        initialValues: {
            username: '',
            password: '',
            email: '',
        },
        onSubmit: values => {
            onSubmit(values as User);
        },
        validationSchema,
    });

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
                <FormControl isInvalid={touched.username && !!errors.username}>
                    <Input
                        name="username"
                        placeholder="Username"
                        disabled={isLoading}
                        onChange={handleChange}
                        value={values.username}
                    />
                    <FormErrorMessage>{errors?.username}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={touched.password && !!errors.password}>
                    <PasswordInput
                        name="password"
                        placeholder="Password"
                        disabled={isLoading}
                        onChange={handleChange}
                        value={values.password}
                    />
                    <FormErrorMessage>{errors?.password}</FormErrorMessage>
                </FormControl>
                <Button
                    variantColor="blue"
                    type="submit"
                    variant="solid"
                    isLoading={isLoading}
                >
                    Login
                </Button>
            </Stack>
        </form>
    );
}

export default LoginForm;
