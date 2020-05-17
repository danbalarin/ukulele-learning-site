import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

import { Theme, Icon } from '@uls/look-react';
import { useSongMany } from '@uls/ukulele-react';
import { Loading } from '../../components/Loading';
import { List } from '../../components/List';
import { Error } from '../../components/Error';

const Wrapper = styled.div`
    @media (min-width: ${Theme.breakpoints[0]}) {
        padding-top: 1em;
    }
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    & > * {
        margin-top: 10px;
    }
`;

interface Props {}

function SongListPage({}: Props): ReactElement {
    const { data, loading, error } = useSongMany({});
    if (loading) {
        return <Wrapper children={<Loading />} />;
    }
    if (error || !data) {
        return (
            <Error
                title={error?.name || 'No data'}
                subtitle={
                    error?.message || 'Songs cannot be fetched right now.'
                }
            />
        );
    }

    const likedSongs = data.songMany.filter(song => song.liked);

    return (
        <Wrapper>
            {likedSongs.length ? (
                <List
                    title={
                        <>
                            <Icon name="heart" />
                            &nbsp; Favourited songs
                        </>
                    }
                    items={likedSongs.map(song => ({
                        label: song.title,
                        linkTo: `/song/${song._id}`,
                    }))}
                    columns={3}
                />
            ) : (
                <></>
            )}

            <List
                title="Songs"
                items={data.songMany.map(song => ({
                    label: song.title,
                    linkTo: `/song/${song._id}`,
                }))}
                columns={3}
            />
        </Wrapper>
    );
}

export default SongListPage;
