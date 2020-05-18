import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

import { Theme, Editable } from '@uls/look-react';
import { SongLine, ChordPosition, Chord } from '@uls/ukulele-common';
import { Button, Icon } from '@uls/look-react';

const NullChord = 'empty';

const Wrapper = styled.div`
    width: 100%;
    font-family: ${Theme.fonts.mono};
    font-size: 1.2em;
    letter-spacing: 0.2ch;
    & select {
        margin-right: 0.1ch;
        width: 1.1ch;
        -webkit-appearance: none;
    }
`;

const EditableWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

interface SongTextLineProps {
    textLine: SongLine;
    availableChords?: Chord[];
    enabledEditing?: boolean;
    onChange?: (newSongLine: SongLine) => void;
    onRemove?: () => void;
}

function SongTextLine({
    textLine,
    enabledEditing,
    onChange,
    availableChords,
    onRemove,
}: SongTextLineProps): ReactElement {
    const TextLineComponent =
        enabledEditing && onChange && availableChords && onRemove ? (
            <EditableWrapper>
                <Button onClick={onRemove} size="sm">
                    <Icon name="times" />
                </Button>
                <EditableSongTextLine
                    textLine={textLine}
                    onChange={onChange}
                    availableChords={availableChords}
                />
            </EditableWrapper>
        ) : (
            <ReadOnlySongTextLine textLine={textLine} />
        );
    return <Wrapper>{TextLineComponent}</Wrapper>;
}

const replaceAt = (str: string, index: number, replacement: string) =>
    str.substr(0, index) + replacement + str.substr(index + replacement.length);

const chordPosToText = (chordPositions: ChordPosition[], length: number) => {
    let res = ' '.repeat(length);
    for (const chordPos of chordPositions) {
        res = replaceAt(res, chordPos.offset, chordPos.chord.name);
    }
    return res;
};

const EditableSongTextLineWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

interface EditableSongTextLineProps {
    textLine: SongLine;
    onChange: (newTextLine: SongLine) => void;
    availableChords: Chord[];
}

function EditableSongTextLine({
    textLine,
    onChange,
    availableChords,
}: EditableSongTextLineProps): ReactElement {
    const selectsRow = [];

    const findAndChangeChord = (index: number) => (chord?: Chord) => {
        const posIndex = textLine.chords.findIndex(
            chordPos => chordPos.offset === index
        );

        if (!chord) {
            textLine.chords.splice(posIndex, 1);
        } else {
            if (posIndex === -1) {
                const newChordPos: ChordPosition = {
                    offset: index,
                    chord,
                };
                textLine.chords.push(newChordPos);
            } else {
                textLine.chords[posIndex].chord = chord;
            }
        }
        onChange(textLine);
    };

    const selectedChords: { [key: number]: Chord } = {};

    textLine.chords.forEach(chord => {
        selectedChords[chord.offset] = chord.chord;
    });

    for (let i = 0; i < textLine.lyrics.length + 1; ++i) {
        selectsRow.push(
            <ChordsSelect
                key={`chord row ${textLine.lyrics} ${i}`}
                onChange={findAndChangeChord(i)}
                availableChords={availableChords}
                value={selectedChords[i]}
            />
        );
    }

    return (
        <EditableSongTextLineWrapper>
            <div>{selectsRow}</div>
            <Editable
                value={textLine.lyrics}
                onSubmit={(newLyrics: string) =>
                    onChange({ chords: textLine.chords, lyrics: newLyrics })
                }
            />
        </EditableSongTextLineWrapper>
    );
}

const ReadOnlyChordsLine = styled.pre`
    display: block;
    font-weight: bold;
`;

interface ReadOnlySongTextLineProps {
    textLine: SongLine;
}

function ReadOnlySongTextLine({
    textLine,
}: ReadOnlySongTextLineProps): ReactElement {
    return (
        <>
            <ReadOnlyChordsLine>
                {chordPosToText(textLine.chords, textLine.lyrics.length)}
            </ReadOnlyChordsLine>
            <pre>{textLine.lyrics}</pre>
        </>
    );
}

interface ChordsSelectProps {
    availableChords: Chord[];
    value?: Chord;
    onChange: (chord?: Chord) => void;
}

function ChordsSelect({
    availableChords,
    onChange,
    value,
}: ChordsSelectProps): ReactElement {
    return (
        <select
            onChange={e =>
                onChange(
                    availableChords.find(chord => chord.name === e.target.value)
                )
            }
            value={value?.name || NullChord}
        >
            <option value={NullChord}>-</option>
            {availableChords.map((chord, i) => (
                <option key={i} value={chord.name}>
                    {chord.name}
                </option>
            ))}
        </select>
    );
}

export default SongTextLine;
