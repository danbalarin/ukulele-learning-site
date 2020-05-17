import React, { ReactElement, useRef, useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import styled from '@emotion/styled';

import {
    AsyncSelect,
    DisplayBox,
    Heading,
    Editable,
    Icon,
    Button,
    useToast,
} from '@uls/look-react';
import {
    Metronome,
    StrummingPattern as StrummingPatternComponent,
    CHORD_PROGRESSION_BY_ID_RETURN,
    CHORD_PROGRESSION_BY_ID,
    CHORD_PROGRESSION_BY_ID_VARIABLES,
    useChordProgressionCreateOne,
    CHORD_PROGRESSION_CREATE_ONE_RETURN,
    CHORD_PROGRESSION_CREATE_ONE_VARIABLES,
    CHORD_PROGRESSION_CREATE_ONE,
    CHORD_PROGRESSION_UPDATE_BY_ID_RETURN,
    CHORD_PROGRESSION_UPDATE_BY_ID_VARIABLES,
    CHORD_PROGRESSION_UPDATE_BY_ID,
} from '@uls/ukulele-react';
import { Chord, ChordProgression, Strum } from '@uls/ukulele-common';
import {
    Chord as ChordComponent,
    CHORD_SEARCH,
    CHORD_SEARCH_RETURN,
    CHORD_SEARCH_VARIABLES,
} from '@uls/ukulele-react';
import { useUserLocalQuery } from '@uls/user-react';
import { Role } from '@uls/auth-common';
import { Loading } from '../../components/Loading';

const defaultChordProgression: ChordProgression<string> & {
    creatorId: string;
} = {
    name: 'Chord Progression',
    chords: [],
    creator: '',
    strummingPattern: {
        pattern: [
            Strum.D,
            Strum.U,
            Strum.D,
            Strum.U,
            Strum.D,
            Strum.U,
            Strum.D,
            Strum.U,
        ],
        metronomePreset: { tempo: 100 },
    },
    creatorId: '',
};

const ChordProgressionPageWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ChordProgressionPageDisplayWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-evenly;
    margin: 10px 0;
    & > div {
        margin: 10px;
    }
`;

interface ChordProgressionPageProps
    extends RouteComponentProps<{ id?: string }> {}

function ChordProgressionPage({
    match: {
        params: { id: routeId },
    },
}: ChordProgressionPageProps): ReactElement {
    const [loading, setLoading] = useState(true);
    const [chordProgression, setChordProgression] = useState<
        ChordProgression<string> & { creatorId: string }
    >(defaultChordProgression);

    const client = useApolloClient();
    const { data } = useUserLocalQuery();

    const strummingPatternRef = useRef<any>();
    const { replace: replaceHistory } = useHistory();
    const toaster = useToast();

    const showError = (error: any) => {
        toaster({
            status: 'error',
            title: 'Error while saving',
            description: 'Check console for more information',
        });
        console.error('Application error:');
        console.error(error);
    };

    const isLogged = () => data && data.user.role >= Role.USER;

    const isAuthor = () =>
        (data?.user as any)?._id === chordProgression.creatorId || !routeId;

    useEffect(() => {
        (async () => {
            if (!routeId) {
                setLoading && setLoading(false);
                return;
            }
            setLoading && setLoading(true);
            const fetchedChordProgression = await client.query<
                CHORD_PROGRESSION_BY_ID_RETURN,
                CHORD_PROGRESSION_BY_ID_VARIABLES
            >({
                query: CHORD_PROGRESSION_BY_ID,
                fetchPolicy: 'no-cache',
                variables: { _id: routeId },
            });
            fetchedChordProgression.data.chordProgressionById &&
                setChordProgression &&
                setChordProgression(
                    fetchedChordProgression.data.chordProgressionById
                );
            setLoading && setLoading(false);
        })();
    }, []);

    const saveCallback = async () => {
        const transformedChordProgression = {
            chordProgression: {
                chordsIds: chordProgression.chords.map(
                    (chord: any) => chord._id
                ),
                name: chordProgression.name,
            },
            tempo: chordProgression.strummingPattern?.metronomePreset?.tempo,
            strummingPattern: chordProgression.strummingPattern?.pattern,
        };

        let data;
        let errors;

        if (routeId) {
            const updatedChordProgression = await client.mutate<
                CHORD_PROGRESSION_UPDATE_BY_ID_RETURN,
                CHORD_PROGRESSION_UPDATE_BY_ID_VARIABLES
            >({
                mutation: CHORD_PROGRESSION_UPDATE_BY_ID,
                variables: { ...transformedChordProgression, _id: routeId },
            });

            errors = updatedChordProgression.errors;
            data =
                updatedChordProgression?.data?.chordProgressionUpdateById
                    .record;
        } else {
            const createdChordProgression = await client.mutate<
                CHORD_PROGRESSION_CREATE_ONE_RETURN,
                CHORD_PROGRESSION_CREATE_ONE_VARIABLES
            >({
                mutation: CHORD_PROGRESSION_CREATE_ONE,
                variables: transformedChordProgression,
            });

            errors = createdChordProgression.errors;
            data =
                createdChordProgression?.data?.chordProgressionCreateOne.record;
        }

        if (!errors && !!data) {
            if (!routeId) {
                replaceHistory(`/chordprogression/${data._id}`);
            } else {
                setChordProgression(data);
            }
        } else {
            showError(errors);
        }
    };

    const chordsChangeCallback = (changedChords: Chord[]) => {
        setChordProgression({ ...chordProgression, chords: changedChords });
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <ChordProgressionPageWrapper>
            <ChordProgressionPageDisplayWrapper>
                <Heading>Custom chord progression</Heading>
            </ChordProgressionPageDisplayWrapper>
            <ChordProgressionName
                name={chordProgression.name}
                onChange={newName =>
                    setChordProgression({ ...chordProgression, name: newName })
                }
            />
            <ChordProgressionPageDisplayWrapper>
                <div>
                    <AddChord
                        onSelect={chord =>
                            setChordProgression({
                                ...chordProgression,
                                chords: [...chordProgression.chords, chord],
                            })
                        }
                    />
                    <ChordListPresenter
                        chords={chordProgression.chords}
                        onChange={chordsChangeCallback}
                    />
                </div>
                <div>
                    <StrummingPatternComponent
                        ref={strummingPatternRef}
                        strummingPattern={chordProgression.strummingPattern}
                    />
                    <Metronome
                        halfTick={number =>
                            strummingPatternRef.current?.tick(number)
                        }
                        tempo={
                            chordProgression.strummingPattern?.metronomePreset
                                ?.tempo
                        }
                        onChange={newTempo =>
                            setChordProgression({
                                ...chordProgression,
                                strummingPattern: {
                                    pattern:
                                        chordProgression.strummingPattern
                                            ?.pattern || [],
                                    metronomePreset: { tempo: newTempo },
                                },
                            })
                        }
                    />
                </div>
            </ChordProgressionPageDisplayWrapper>
            {isLogged() && isAuthor() && (
                <ChordProgressionPageDisplayWrapper>
                    <Button onClick={saveCallback}>Save</Button>
                </ChordProgressionPageDisplayWrapper>
            )}
        </ChordProgressionPageWrapper>
    );
}

const ChordListPresenterWrapper = styled.div`
    width: 100%;
    min-width: 200px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-evenly;
`;

const NoChordsWrapper = styled.span`
    padding: 10px;
    padding-top: 20px;
`;

const ChordHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const ChordDeleteButton = styled(Button)`
    width: 100%;
    margin-top: 4px;
`;

interface ChordListPresenterProps {
    chords: Chord[];
    onChange: (newChords: Chord[]) => void;
}

function ChordListPresenter({
    chords,
    onChange,
}: ChordListPresenterProps): ReactElement {
    const swapRight = (index: number) => () => {
        const newChordArray = [...chords];
        const oldChord = newChordArray[index];
        newChordArray[index] = newChordArray[index + 1];
        newChordArray[index + 1] = oldChord;
        onChange(newChordArray);
    };

    const swapLeft = (index: number) => () => {
        const newChordArray = [...chords];
        const oldChord = newChordArray[index];
        newChordArray[index] = newChordArray[index - 1];
        newChordArray[index - 1] = oldChord;
        onChange(newChordArray);
    };

    const deleteChord = (index: number) => () => {
        const newChordArray = [...chords];
        newChordArray.splice(index, 1);
        onChange(newChordArray);
    };

    const buildLeftButton = (index: number) =>
        index !== 0 ? (
            <Button variant="link" onClick={swapLeft(index)}>
                <Icon name="chevron-left" />
            </Button>
        ) : (
            <></>
        );

    const buildRightButton = (index: number, max: number) =>
        index !== max ? (
            <Button variant="link" onClick={swapRight(index)}>
                <Icon name="chevron-right" />
            </Button>
        ) : (
            <></>
        );

    return (
        <ChordListPresenterWrapper>
            {chords.length > 0 ? (
                chords.map((chord, i) => (
                    <DisplayBox
                        key={`chord${i}`}
                        heading={
                            <ChordHeader>
                                {buildLeftButton(i)}
                                <Heading children={chord.name} size="lg" />
                                {buildRightButton(i, chords.length - 1)}
                            </ChordHeader>
                        }
                    >
                        <ChordComponent chord={chord} />
                        <ChordDeleteButton
                            variantColor="red"
                            onClick={deleteChord(i)}
                        >
                            <Icon name="times" />
                        </ChordDeleteButton>
                    </DisplayBox>
                ))
            ) : (
                <NoChordsWrapper>No chords added</NoChordsWrapper>
            )}
        </ChordListPresenterWrapper>
    );
}

interface AddChordProps {
    onSelect: (selectedChord: Chord) => void;
}

function AddChord({ onSelect }: AddChordProps): ReactElement {
    const client = useApolloClient();

    const findChords = async (input: string) => {
        const { data } = await client.query<
            CHORD_SEARCH_RETURN,
            CHORD_SEARCH_VARIABLES
        >({
            query: CHORD_SEARCH,
            variables: { query: input },
        });
        return data.chordSearch.map(chord => ({
            label: chord.name,
            value: chord,
        }));
    };

    return (
        <AsyncSelect
            keyName="chordpage select"
            loadOptions={findChords}
            onChange={value => value && onSelect(value.value as Chord)}
            clearOnChange={true}
            multi={false}
            noOptionsMessage={({ inputValue }) =>
                !!inputValue
                    ? `Value '${inputValue}' cannot be found`
                    : 'Start typing'
            }
            placeholder="Search chords"
        />
    );
}

const ChordProgressionNameWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
`;

interface NameProps {
    name?: string;

    onChange: (newName: string) => void;
}

function ChordProgressionName({ name, onChange }: NameProps): ReactElement {
    return (
        <ChordProgressionNameWrapper>
            <Heading size="lg">Name:&nbsp;</Heading>
            <Editable value={name} onSubmit={onChange} />
        </ChordProgressionNameWrapper>
    );
}

export default ChordProgressionPage;
