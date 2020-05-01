import React, { ReactElement } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from '@emotion/styled';
import { Author } from '../../../../modules/ukulele/common';

interface AdminAuthorPageProps extends RouteComponentProps<{ id?: string }> {}

function AdminAuthorPage({}: AdminAuthorPageProps): ReactElement {
    const Wrapper = styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    `;
    return (
        <Wrapper>
            <AuthorForm onSubmit={console.log} />
            <AuthorTable />
        </Wrapper>
    );
}

interface AuthorFormProps {
    value?: Author;
    onSubmit: (author: Author) => void;
}

function AuthorForm({}: AuthorFormProps): ReactElement {
    return <></>;
}

interface AuthorTableProps {}

function AuthorTable({}: AuthorTableProps): ReactElement {
    return <></>;
}

export default AdminAuthorPage;
