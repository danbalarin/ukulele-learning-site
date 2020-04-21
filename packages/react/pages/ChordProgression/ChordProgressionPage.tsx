import React, { ReactElement, useRef, useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { RouteComponentProps } from 'react-router-dom';
import styled from '@emotion/styled';

import { AsyncSelect, DisplayBox, Heading, Editable } from '@uls/look-react';
import {
    Metronome,
    StrummingPattern as StrummingPatternComponent,
} from '@uls/ukulele-react';
import { Chord, ChordProgression, Strum } from '@uls/ukulele-common';
import {
    Chord as ChordComponent,
    CHORD_SEARCH,
    CHORD_SEARCH_RETURN,
    CHORD_SEARCH_VARIABLES,
} from '@uls/ukulele-react';
import { useUserLocalQuery } from '@uls/user-react';

const defaultChordProgression: ChordProgression<string> = {
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
};

interface ChordProgressionPageProps
    extends RouteComponentProps<{ id?: string }> {}

function ChordProgressionPage({}: ChordProgressionPageProps): ReactElement {
    const strummingPatternRef = useRef<any>();
    const [chords, setChords] = useState<Chord[]>([]);
    const [chordProgression, setChordProgression] = useState<
        ChordProgression<string>
    >(defaultChordProgression);
    const { data } = useUserLocalQuery();

    const Wrapper = styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `;

    const DisplayWrapper = styled.div`
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

    return (
        <Wrapper>
            <DisplayWrapper>
                <Heading>Chord progression</Heading>
            </DisplayWrapper>
            {/* <DisplayWrapper> */}
            <ChordProgressionName
                name={chordProgression?.name}
                onChange={console.log}
            />
            {/* </DisplayWrapper> */}
            <DisplayWrapper>
                <div>
                    <AddChord
                        onSelect={chord => setChords([...chords, chord])}
                    />
                    <ChordListPresenter chords={chords} />
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
                    />
                </div>
            </DisplayWrapper>
        </Wrapper>
    );
}

interface ChordListPresenterProps {
    chords: Chord[];
}

function ChordListPresenter({ chords }: ChordListPresenterProps): ReactElement {
    const Wrapper = styled.div`
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

    return (
        <Wrapper>
            {chords.length > 0 ? (
                chords.map(chord => (
                    <DisplayBox
                        heading={<Heading children={chord.name} size="lg" />}
                    >
                        <ChordComponent chord={chord} />
                    </DisplayBox>
                ))
            ) : (
                <NoChordsWrapper>No chords added</NoChordsWrapper>
            )}
        </Wrapper>
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
            loadOptions={findChords}
            onChange={value => value && onSelect(value.value as Chord)}
            clearOnChange={true}
            noOptionsMessage={({ inputValue }) =>
                !!inputValue
                    ? `Value '${inputValue}' cannot be found`
                    : 'Start typing'
            }
            placeholder="Search chords"
        />
    );
}

interface NameProps {
    name?: string;

    onChange: (newName: string) => void;
}

function ChordProgressionName({ name, onChange }: NameProps): ReactElement {
    const Wrapper = styled.div`
        display: flex;
        flex-direction: row;
        align-items: flex-end;
    `;
    return (
        <Wrapper>
            <Heading size="lg">Name:&nbsp;</Heading>
            <Editable value={name} onSubmit={onChange} />
        </Wrapper>
    );
}

export default ChordProgressionPage;
