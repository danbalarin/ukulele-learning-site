import React, { ReactElement, useState } from 'react';
import styled from '@emotion/styled';

import { Heading, Editable, useToast } from '@uls/look-react';
import {
    useUserLocalQuery,
    useUserUpdateMe,
    useUserLocalMutation,
} from '@uls/user-react';
import { useLikedSongs } from '@uls/ukulele-react';

import { Error } from '../../components/Error';
import { Loading } from '../../components/Loading';
import { List } from '../../components/List';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & > * {
        margin-top: 10px;
    }
`;
const InlineHeading = styled(Heading)`
    display: flex;
    flex-direction: row;
`;

interface Props {}

function ProfilePage({}: Props): ReactElement {
    const [refreshKey, setRefreshKey] = useState(0);
    const userQuery = useUserLocalQuery();
    const likedSongsQuery = useLikedSongs();
    const [updateUser] = useUserUpdateMe();
    const [updateLocalUser] = useUserLocalMutation();
    const toaster = useToast();

    if (userQuery.loading) {
        return <Loading />;
    }

    const user = userQuery?.data?.user;
    if (!user) {
        return <Error title="404" subtitle="User not found" />;
    }

    const onUsernameChange = async (newUsername: string) => {
        if (userQuery.data) {
            try {
                const updatedUser = await updateUser({
                    variables: {
                        record: {
                            username: newUsername,
                        },
                    },
                });
                if (updatedUser.data?.userUpdateMe) {
                    updateLocalUser({
                        variables: {
                            user: updatedUser.data.userUpdateMe,
                        },
                    });
                }
            } catch (err) {
                toaster({
                    status: 'error',
                    title: 'Server error',
                    description: err.message,
                });
                setRefreshKey(refreshKey + 1);
            }
        }
    };

    return (
        <Wrapper>
            <Heading>Hello, {user.username}</Heading>
            <InlineHeading size="md">
                Change username:&nbsp;
                <Editable
                    key={refreshKey}
                    value={user.username}
                    onSubmit={onUsernameChange}
                />
            </InlineHeading>
            {likedSongsQuery.data ? (
                <List
                    title="Liked songs"
                    items={likedSongsQuery.data.likedSongs.map(({ song }) => ({
                        label: song.title,
                        linkTo: `/song/${song._id}`,
                        description: song.author?.name,
                    }))}
                    columns={2}
                />
            ) : (
                <Heading size="sm">No liked songs</Heading>
            )}
        </Wrapper>
    );
}

export default ProfilePage;
