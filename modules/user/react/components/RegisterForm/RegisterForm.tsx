import React, { ReactElement } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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
    onSubmit: (user: User) => void;
    isLoading?: boolean;
    termsAndConditionsElement?: React.ReactNode;
}

function RegisterForm({
    onSubmit,
    isLoading,
    termsAndConditionsElement,
}: Props): ReactElement {
    const { handleSubmit, handleChange, values, touched, errors } = useFormik({
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
        validationSchema: validationSchema(!!termsAndConditionsElement),
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
                    <FormErrorMessage>{errors.username}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={touched.email && !!errors.email}>
                    <Input
                        name="email"
                        placeholder="Email"
                        type="email"
                        disabled={isLoading}
                        onChange={handleChange}
                        value={values.email}
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={touched.password && !!errors.password}>
                    <PasswordInput
                        name="password"
                        placeholder="Password"
                        disabled={isLoading}
                        onChange={handleChange}
                        value={values.password}
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <FormControl
                    isInvalid={touched.passwordMatch && !!errors.passwordMatch}
                >
                    <PasswordInput
                        name="passwordMatch"
                        placeholder="Password again"
                        disabled={isLoading}
                        onChange={handleChange}
                        value={values.passwordMatch}
                    />
                    <FormErrorMessage>{errors.passwordMatch}</FormErrorMessage>
                </FormControl>
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
                    variant="solid"
                    isLoading={isLoading}
                >
                    Register
                </Button>
            </Stack>
        </form>
    );
}

export default RegisterForm;
