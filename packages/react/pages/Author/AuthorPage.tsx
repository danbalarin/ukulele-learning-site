import React, { ReactElement } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
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

    if (!userQuery.data) {
        return (
            <>
                <Heading>Something went wrong while loading.</Heading>
                <Heading size="md">Please try refreshing the page.</Heading>
            </>
        );
    }

    const author = userQuery.data.authorOne;

    return (
        <Wrapper>
            <Helmet>
                <title>EasyUKU - {author.name}</title>
                <meta
                    property="og:title"
                    content={`EasyUKU - ${author.name}`}
                />
                <meta
                    property="og:description"
                    content={`Learn how to play  song by ${author.name} on ukulele!`}
                />
                <meta property="og:locale" content="en_US" />
                <meta property="og:site_name" content="EasyUKU" />
            </Helmet>

            <Heading>{author.name}</Heading>
            <MemberWrapper>{memberLinks}</MemberWrapper>
            {!!author.songs.length ? (
                <List
                    title="Songs"
                    items={
                        author.songs.map(song => ({
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
