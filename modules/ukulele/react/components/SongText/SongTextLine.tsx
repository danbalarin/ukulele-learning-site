import React, { ReactElement, useState } from 'react';
import styled from '@emotion/styled';

import { Theme, Editable } from '@uls/look-react';
import { SongLine, ChordPosition } from '@uls/ukulele-common';

const Wrapper = styled.div`
    width: 100%;
    font-family: ${Theme.fonts.mono};
`;

interface SongTextLineProps {
    textLine: SongLine;
    enabledEditing?: boolean;
    onChange?: (newSongLine: SongLine) => void;
}

function SongTextLine({
    textLine,
    enabledEditing,
    onChange,
}: SongTextLineProps): ReactElement {
    const TextLineComponent =
        enabledEditing && onChange ? (
            <EditableSongTextLine textLine={textLine} onChange={onChange} />
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

interface EditableSongTextLineProps {
    textLine: SongLine;
    onChange: (newTextLine: SongLine) => void;
}

function EditableSongTextLine({
    textLine,
    onChange,
}: EditableSongTextLineProps): ReactElement {
    return (
        <>
            {/* <Editable value={chordPosToText(textLine.chords, textLine.lyrics.length)} onSubmit /> */}
            <span>
                {chordPosToText(textLine.chords, textLine.lyrics.length)}
            </span>
            <Editable
                value={textLine.lyrics}
                onSubmit={(newLyrics: string) =>
                    onChange({ chords: textLine.chords, lyrics: newLyrics })
                }
            />
        </>
    );
}

interface ReadOnlySongTextLineProps {
    textLine: SongLine;
}

function ReadOnlySongTextLine({
    textLine,
}: ReadOnlySongTextLineProps): ReactElement {
    return (
        <>
            <span>
                {chordPosToText(textLine.chords, textLine.lyrics.length)}
            </span>
            <span>{textLine.lyrics}</span>
        </>
    );
}

export default SongTextLine;
