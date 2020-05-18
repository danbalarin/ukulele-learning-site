import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

import { SongLine, Chord } from '@uls/ukulele-common';

import SongTextLine from './SongTextLine';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

interface Props {
    songText: SongLine[];
    availableChords?: Chord[];
    onChange?: (newSongText: SongLine[]) => void;
    editable?: boolean;
}

function SongText({
    songText,
    onChange,
    editable,
    availableChords,
}: Props): ReactElement {
    const onChangeWrapper = (index: number) => (newSongLine: SongLine) => {
        const newSongText = [...songText];
        newSongText[index] = newSongLine;
        onChange && onChange(newSongText);
    };

    const onRemoveWrapper = (index: number) => () => {
        const newSongText = [...songText];
        newSongText.splice(index, 1);
        onChange && onChange(newSongText);
    };

    return (
        <Wrapper>
            {songText?.map((songLine, i) => (
                <SongTextLine
                    key={`songline${i}${songLine.lyrics}`}
                    textLine={songLine}
                    onChange={onChangeWrapper(i)}
                    enabledEditing={editable}
                    onRemove={onRemoveWrapper(i)}
                    availableChords={availableChords}
                />
            ))}
        </Wrapper>
    );
}

export default SongText;
