import React, { ReactElement, useEffect, useState, useRef } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import styled from '@emotion/styled';

import {
    SongText,
    SONG_BY_ID,
    SONG_BY_ID_RETURN,
    SONG_BY_ID_VARIABLES,
    Metronome,
    StrummingPattern,
    useSongCreateOne,
    SONG_CREATE_ONE_VARIABLES,
    useSongUpdateById,
    SONG_UPDATE_BY_ID_VARIABLES,
} from '@uls/ukulele-react';
import {
    Button,
    Icon,
    ComponentWrapper,
    Heading,
    useToast,
    DisplayBox,
} from '@uls/look-react';
import { Song, Strum } from '@uls/ukulele-common';
import { useUserLocalQuery } from '@uls/user-react';
import { Role } from '@uls/auth-common';

import EditableSongPage from './EditableSongPage';
import ChordComponent from '../../../../.yarn/$$virtual/@uls-ukulele-react-virtual-fc78971b44/1/modules/ukulele/react/components/Chord/Chord';
import { Loading } from '../../components/Loading';

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
    const [song, setSong] = useState<Song<any> & { _id: string }>({
        _id: '',
        chords: [],
        title: '',
        lyrics: [],
        creator: '',
    });
    const [loading, setLoading] = useState<boolean>(id !== 'new');
    const [editting, setEditting] = useState(false);
    const songEditRef = useRef<any>();
    const client = useApolloClient();
    const { replace: replaceHistory } = useHistory();
    const toaster = useToast();
    const { data: userData } = useUserLocalQuery();
    const [createSong] = useSongCreateOne();

    const [updateSong] = useSongUpdateById();

    const showError = (error: any) => {
        toaster({
            status: 'error',
            title: 'Error while saving',
            description: 'Check console for more information',
        });
        console.error('Application error:');
        console.error(error);
        setEditting(false);
    };

    const isModerator = () =>
        userData?.user.role && userData?.user.role >= Role.MODERATOR;

    useEffect(() => {
        (async () => {
            if (id !== 'new' && isModerator()) {
                setLoading && setLoading(true);
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
                setLoading && setLoading(false);
            }
        })();
    }, [id, userData]);

    const save = async () => {
        if (!songEditRef.current?.hasChanged()) {
            setEditting(false);
            return;
        }
        const newSong: Song<any> = songEditRef.current?.getSong();
        const transformedSong: Pick<SONG_CREATE_ONE_VARIABLES, 'song'> = {
            song: {
                title: newSong.title,
                authorId: (newSong.author as any)?._id,
                chordsIds: newSong.chords?.map(({ _id }: any) => _id),
                lyrics: newSong.lyrics.map(lyric => ({
                    lyrics: lyric.lyrics,
                    chords: lyric.chords.map(({ offset, chord }: any) => ({
                        offset: offset,
                        chordId: chord._id,
                    })),
                })),
            },
        };

        const variables: SONG_CREATE_ONE_VARIABLES = {
            song: transformedSong.song,
            strummingPattern: newSong.strummingPattern?.pattern,
            tempo: newSong.strummingPattern?.metronomePreset?.tempo,
        };

        let data;
        let errors;
        if (id === 'new') {
            const created = await createSong({ variables });
            errors = created.errors;
            data = created.data?.songCreateOne;
        } else {
            const updateVariables: SONG_UPDATE_BY_ID_VARIABLES = {
                ...variables,
                _id: song._id,
            };
            const created = await updateSong({ variables: updateVariables });
            errors = created.errors;
            data = created.data?.songUpdateById;
        }

        if (!errors && !!data) {
            if (id === 'new') {
                replaceHistory(`/song/${data.record._id}`);
            } else {
                setSong(data.record);
            }
            setEditting(false);
        } else {
            showError(errors);
        }
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

    return loading ? (
        <Loading />
    ) : (
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

const ChordsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const ChordWrapper = styled.div`
    width: 33%;
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
                <ComponentWrapper title="Chords">
                    <ChordsWrapper>
                        {song.chords.map((chord, i) => (
                            <ChordWrapper key={'chordwrapper' + i}>
                                <DisplayBox heading={chord.name}>
                                    <ChordComponent chord={chord} />
                                </DisplayBox>
                            </ChordWrapper>
                        ))}
                    </ChordsWrapper>
                </ComponentWrapper>

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
                    {song.strummingPattern ? (
                        <StrummingPattern
                            ref={strummingPatternRef}
                            strummingPattern={song.strummingPattern}
                        />
                    ) : (
                        <span>No strumming set.</span>
                    )}
                </ComponentWrapper>
            </ComponentsWrapper>
        </Wrapper>
    );
}

export default SongPage;
