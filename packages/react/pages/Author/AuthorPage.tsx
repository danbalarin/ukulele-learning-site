import React, { ReactElement } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { Heading } from '@uls/look-react';
import { useAuthorById } from '@uls/ukulele-react';

import { Loading } from '../../components/Loading';
import { List } from '../../components/List';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const MemberWrapper = styled.div`
    display: flex;
    flex-direction: row;
    & > * {
        margin-right: 10px;
    }
`;

interface Props extends RouteComponentProps<{ id: string }> {}

function AuthorPage({
    match: {
        params: { id: authorId },
    },
}: Props): ReactElement {
    const userQuery = useAuthorById({ _id: authorId });

    if (userQuery.loading) {
        return <Loading />;
    }

    const memberLinks = userQuery.data?.authorOne.members?.map((mem: any) => (
        <Link to={`/author/${mem._id}`} key={`/author/${mem._id}`}>
            <Heading size="sm">{mem.name}</Heading>
        </Link>
    ));

    return (
        <Wrapper>
            <Heading>{userQuery.data?.authorOne.name}</Heading>
            <MemberWrapper>{memberLinks}</MemberWrapper>
            {!!userQuery.data?.authorOne.songs.length ? (
                <List
                    title="Songs"
                    items={
                        userQuery.data?.authorOne.songs.map(song => ({
                            label: song.title,
                            linkTo: `/song/${song._id}`,
                            description: song.liked ? 'Liked' : undefined,
                        })) || []
                    }
                />
            ) : (
                <Heading size="md">No songs</Heading>
            )}
        </Wrapper>
    );
}

export default AuthorPage;
