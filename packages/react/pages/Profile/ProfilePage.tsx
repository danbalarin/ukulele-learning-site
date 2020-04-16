import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

import { Heading, Editable } from '@uls/look-react';
import { useUserLocalQuery } from '@uls/user-react';

import { Error } from '../../components/Error';
import { Loading } from '../../components/Loading';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

interface Props {}

function ProfilePage({}: Props): ReactElement {
    const userQuery = useUserLocalQuery();

    if (userQuery.loading) {
        return <Loading />;
    }

    const user = userQuery?.data?.user;
    if (!user) {
        return <Error title="404" subtitle="User not found" />;
    }

    return (
        <Wrapper>
            <Heading>Hello, {user.username}</Heading>
            {/* <Editable value={user.username} onSubmit={console.log} /> */}
        </Wrapper>
    );
}

export default ProfilePage;
