import React, { ReactElement, useEffect, useState, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import styled from '@emotion/styled';

import {
    SongText,
    SONG_BY_ID,
    SONG_BY_ID_RETURN,
    SONG_BY_ID_VARIABLES,
    Metronome,
    StrummingPattern,
} from '@uls/ukulele-react';
import { Button, Icon, ComponentWrapper, Heading } from '@uls/look-react';
import { Song, Strum } from '@uls/ukulele-common';
import { useUserLocalQuery } from '@uls/user-react';
import { Role } from '@uls/auth-common';

import EditableSongPage from './EditableSongPage';

const SongPageWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    & > * {
        margin: 8px;
    }
`;

const ButtonWrapper = styled.div`
    width: 100%;
    z-index: 100;
`;

interface SongPageProps extends RouteComponentProps<{ id: string }> {}

function SongPage({
    match: {
        params: { id },
    },
}: SongPageProps): ReactElement {
    const [song, setSong] = useState<Song<any>>({
        chords: [],
        title: '',
        lyrics: [],
        creator: '',
    });
    const [editting, setEditting] = useState(false);
    const songEditRef = useRef<any>();
    const client = useApolloClient();
    const { data } = useUserLocalQuery();

    const isModerator = () =>
        data?.user.role && data?.user.role >= Role.MODERATOR;

    useEffect(() => {
        (async () => {
            if (id !== 'new' && isModerator()) {
                const fetchedSong = await client.query<
                    SONG_BY_ID_RETURN,
                    SONG_BY_ID_VARIABLES
                >({
                    query: SONG_BY_ID,
                    fetchPolicy: 'no-cache',
                    variables: { _id: id },
                });
                fetchedSong?.data?.songOne &&
                    setSong &&
                    setSong(fetchedSong.data.songOne);
            }
        })();
    }, [id, data]);

    const save = () => {
        const newSong: Song<any> = songEditRef.current?.getSong();
        console.log(newSong);
        // save
        setEditting(false);
    };

    const Btn = editting ? (
        <Button variantColor="green" onClick={save}>
            Save
            <Icon name="check" size="sm" />
        </Button>
    ) : (
        <Button variantColor="orange" onClick={() => setEditting(true)}>
            Edit
            <Icon name="pen" size="sm" />
        </Button>
    );

    return (
        <SongPageWrapper>
            {isModerator() && <ButtonWrapper>{Btn}</ButtonWrapper>}
            {editting ? (
                <EditableSongPage song={song} ref={songEditRef} />
            ) : (
                <SongPagePresenter song={song} />
            )}
        </SongPageWrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    position: relative;
`;

const TextWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    z-index: 1;
`;

const ComponentsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    position: fixed;
    & > * {
        margin: 8px;
    }
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
`;

interface SongPagePresenterProps {
    song: Song<any>;
}

function SongPagePresenter({ song }: SongPagePresenterProps): ReactElement {
    const strummingPatternRef = useRef<any>();

    return (
        <Wrapper>
            <TextWrapper>
                <Heading size="lg">{song.title}</Heading>
                <Heading size="md">
                    {song.author ? song.author.name : 'Unknown Authors'}
                </Heading>
                <SongText songText={song.lyrics} />
            </TextWrapper>
            <ComponentsWrapper>
                <ComponentWrapper title="Metronome">
                    <Metronome
                        tempo={
                            song.strummingPattern?.metronomePreset?.tempo || 100
                        }
                        halfTick={number =>
                            strummingPatternRef.current?.tick(number)
                        }
                    />
                </ComponentWrapper>
                <ComponentWrapper title="Strumming pattern">
                    <StrummingPattern
                        ref={strummingPatternRef}
                        strummingPattern={
                            song.strummingPattern || {
                                pattern: [
                                    Strum.U,
                                    Strum.D,
                                    Strum.U,
                                    Strum.D,
                                    Strum.U,
                                    Strum.D,
                                    Strum.U,
                                    Strum.D,
                                ],
                            }
                        }
                    />
                </ComponentWrapper>
            </ComponentsWrapper>
        </Wrapper>
    );
}

export default SongPage;
