import React, { ReactElement, useState, useEffect, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';

import { Author } from '@uls/ukulele-common';
import {
    Input,
    AsyncSelect,
    ComponentWrapper,
    Button,
    Icon,
    FormControl,
    FormErrorMessage,
} from '@uls/look-react';
import {
    AUTHOR_SEARCH,
    AUTHOR_SEARCH_RETURN,
    AUTHOR_SEARCH_VARIABLES,
    useAuthorCreateOne,
} from '@uls/ukulele-react';

import AuthorTable from './AuthorTable';

interface AdminAuthorPageProps extends RouteComponentProps<{ id?: string }> {}

function AdminAuthorPage({}: AdminAuthorPageProps): ReactElement {
    const Wrapper = styled.div`
        width: 100%;
        height: min-content;
        display: flex;
        padding: 0 16px;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        & > * {
            padding-top: 16px;
        }
    `;

    const tableRef = useRef<any>();

    return (
        <Wrapper>
            <ComponentWrapper title="Create new author" width="100%">
                <AuthorForm onSubmit={() => tableRef?.current?.refetch()} />
            </ComponentWrapper>
            <ComponentWrapper title="Authors table" width="100%">
                <AuthorTable ref={tableRef} />
            </ComponentWrapper>
        </Wrapper>
    );
}

const AuthorFormInnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    & > * {
        margin-top: 10px;
    }
`;

const authorValidationSchema = Yup.object().shape({
    name: Yup.string().required(`Author's name is required`),
});

interface AuthorFormProps {
    onSubmit?: () => void;
}

function AuthorForm({ onSubmit }: AuthorFormProps): ReactElement {
    const client = useApolloClient();
    const [selectKey, setSelectKey] = useState('select-author');
    const [createAuthor, { data, loading, error }] = useAuthorCreateOne();

    const {
        handleSubmit,
        handleChange,
        values,
        touched,
        errors,
        setFieldValue,
        resetForm,
    } = useFormik<{
        name: string;
        members: {
            value: Author & { _id: string };
            label: string;
        }[];
    }>({
        initialValues: {
            name: '',
            members: [],
        },
        onSubmit: values => {
            createAuthor({
                variables: {
                    record: {
                        name: values.name,
                        memberIds:
                            values.members?.map(member => member.value._id) ||
                            [],
                    },
                },
            });
            onSubmit && onSubmit();
        },
        validationSchema: authorValidationSchema,
    });

    const findAuthors = async (input: string) => {
        const { data } = await client.query<
            AUTHOR_SEARCH_RETURN,
            AUTHOR_SEARCH_VARIABLES
        >({
            query: AUTHOR_SEARCH,
            variables: { query: input },
        });
        return data.authorSearch.map(author => ({
            label: author.name,
            value: author,
        }));
    };

    const onChangeSelect = (members: { value: Author & { _id: string } }[]) => {
        setFieldValue('members', members);
    };

    useEffect(() => {
        resetForm();
        setSelectKey(selectKey + '.');
    }, [data?.authorCreateOne?.record.name]);

    return (
        <form onSubmit={handleSubmit}>
            <AuthorFormInnerWrapper>
                <FormControl isInvalid={touched.name && !!errors.name}>
                    <Input
                        key="author-name"
                        name="name"
                        placeholder="Name"
                        disabled={loading}
                        onChange={handleChange}
                        value={values.name}
                    />
                    <FormErrorMessage show={!!errors.name}>
                        {errors?.name}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={touched.name && !!errors.name}>
                    <AsyncSelect
                        keyName={selectKey}
                        placeholder="Find members"
                        onChange={data => onChangeSelect([data].flat(1))}
                        loadOptions={findAuthors}
                        loading={loading}
                        multi={true}
                        // @ts-ignore-line
                        value={values.members}
                    />
                    <FormErrorMessage show={!!errors.name}>
                        {errors?.name}
                    </FormErrorMessage>
                </FormControl>
                <Button variantColor="green" isLoading={loading} type="submit">
                    <Icon name="plus" />
                </Button>
            </AuthorFormInnerWrapper>
        </form>
    );
}

export default AdminAuthorPage;
