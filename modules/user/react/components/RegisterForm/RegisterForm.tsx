import React, { ReactElement } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
    PasswordInput,
    Input,
    Button,
    Stack,
    Checkbox,
    FormControl,
    FormErrorMessage,
} from '@uls/look-react';
import { useSignupMutation } from '../../graphql/user';

const validationSchema = (termsRequired: boolean) =>
    Yup.object().shape({
        username: Yup.string().required('Username must be filled'),
        email: Yup.string()
            .email('Must be valid email')
            .required('Email must be filled'),
        password: Yup.string()
            .min(6, 'Password has to be atleast 6 characters long')
            .required('Password must be filled'),
        passwordMatch: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Password confirmation must be filled'),
        terms: termsRequired
            ? Yup.boolean().required('Terms of service must be checked')
            : Yup.boolean(),
    });

interface Props {
    onRegister: (token: string) => void;
    isLoading?: boolean;
    termsAndConditionsElement?: React.ReactNode;
}

function RegisterForm({
    onRegister,
    isLoading,
    termsAndConditionsElement,
}: Props): ReactElement {
    const [signup, { data, loading, error }] = useSignupMutation();

    const { handleSubmit, handleChange, values, touched, errors } = useFormik({
        initialValues: {
            username: '',
            password: '',
            passwordMatch: '',
            email: '',
            terms: false,
        },
        onSubmit: values => {
            signup({
                variables: {
                    email: values.email,
                    username: values.username,
                    password: values.password,
                },
            });
        },
        validationSchema: validationSchema(!!termsAndConditionsElement),
    });

    if (!!data) {
        onRegister(data.signup.token);
    }

    const invalidFields = error?.graphQLErrors?.[0]?.extensions
        ?.invalidArgs as string[];

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
                <FormControl
                    isInvalid={
                        (touched.username && !!errors.username) ||
                        invalidFields?.includes('username')
                    }
                >
                    <Input
                        name="username"
                        placeholder="Username"
                        disabled={isLoading || loading}
                        onChange={handleChange}
                        value={values.username}
                    />
                    <FormErrorMessage show={!!errors.username}>
                        {errors.username}
                    </FormErrorMessage>
                    <FormErrorMessage
                        show={invalidFields?.includes('username')}
                    >
                        This username is already taken
                    </FormErrorMessage>
                </FormControl>
                <FormControl
                    isInvalid={
                        (touched.email && !!errors.email) ||
                        invalidFields?.includes('email')
                    }
                >
                    <Input
                        name="email"
                        placeholder="Email"
                        type="email"
                        disabled={isLoading || loading}
                        onChange={handleChange}
                        value={values.email}
                    />
                    <FormErrorMessage show={!!errors.email}>
                        {errors.email}
                    </FormErrorMessage>
                    <FormErrorMessage show={invalidFields?.includes('email')}>
                        This email is already taken
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
                        {errors.password}
                    </FormErrorMessage>
                </FormControl>
                <FormControl
                    isInvalid={touched.passwordMatch && !!errors.passwordMatch}
                >
                    <PasswordInput
                        name="passwordMatch"
                        placeholder="Password again"
                        disabled={isLoading || loading}
                        onChange={handleChange}
                        value={values.passwordMatch}
                    />
                    <FormErrorMessage show={!!errors.passwordMatch}>
                        {errors.passwordMatch}
                    </FormErrorMessage>
                </FormControl>
                {termsAndConditionsElement && (
                    <Checkbox
                        name="terms"
                        disabled={isLoading || loading}
                        onChange={handleChange}
                        value={values.passwordMatch}
                        children={termsAndConditionsElement}
                        alignSelf="center"
                    />
                )}

                <Button
                    variantColor="blue"
                    type="submit"
                    variant="solid"
                    isLoading={isLoading || loading}
                >
                    Register
                </Button>
            </Stack>
        </form>
    );
}

export default RegisterForm;
