import React, { ReactElement } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Role } from '@uls/auth-common';
import {
    PasswordInput,
    Input,
    Button,
    Stack,
    FormControl,
    FormErrorMessage,
} from '@uls/look-react';

import { useLoginMutation } from '../../graphql/user';

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

interface Props {
    onLogin: (token: string) => void;
    isLoading?: boolean;
}

function LoginForm({ onLogin, isLoading }: Props): ReactElement {
    const [login, { data, loading, error }] = useLoginMutation();

    const { handleSubmit, handleChange, values, touched, errors } = useFormik({
        initialValues: {
            username: '',
            password: '',
            email: '',
            role: Role.USER,
        },
        onSubmit: values => {
            login({
                variables: {
                    password: values.password,
                    username: values.username,
                },
            });
        },
        validationSchema,
    });

    if (!!data) {
        onLogin(data.login.token);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
                <FormControl isInvalid={touched.username && !!errors.username}>
                    <Input
                        name="username"
                        placeholder="Username"
                        disabled={isLoading || loading}
                        onChange={handleChange}
                        value={values.username}
                    />
                    <FormErrorMessage show={!!errors.username}>
                        {errors?.username}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={touched.password && !!errors.password}>
                    <PasswordInput
                        name="password"
                        placeholder="Password"
                        disabled={isLoading || loading}
                        onChange={handleChange}
                        value={values.password}
                    />
                    <FormErrorMessage show={!!errors.password}>
                        {errors?.password}
                    </FormErrorMessage>
                </FormControl>
                {!!error ? (
                    <FormControl isInvalid={true}>
                        {error?.graphQLErrors.map(
                            ({ message }: any, i: number) => (
                                <FormErrorMessage key={i}>
                                    {message}
                                </FormErrorMessage>
                            )
                        )}
                    </FormControl>
                ) : (
                    <></>
                )}
                <Button
                    variantColor="blue"
                    type="submit"
                    variant="solid"
                    isLoading={isLoading || loading}
                >
                    Login
                </Button>
            </Stack>
        </form>
    );
}

export default LoginForm;
