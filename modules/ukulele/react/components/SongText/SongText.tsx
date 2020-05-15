import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

import { SongLine } from '@uls/ukulele-common';

import SongTextLine from './SongTextLine';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

interface Props {
    songText: SongLine[];
    onChange?: (newSongText: SongLine[]) => void;
    editable?: boolean;
}

function SongText({ songText, onChange, editable }: Props): ReactElement {
    const onChangeWrapper = (index: number) => (newSongLine: SongLine) => {
        const newSongText = [...songText];
        newSongText[index] = newSongLine;
        onChange && onChange(newSongText);
    };

    return (
        <Wrapper>
            {songText?.map((songLine, i) => (
                <SongTextLine
                    textLine={songLine}
                    onChange={onChangeWrapper(i)}
                    enabledEditing={editable}
                />
            ))}
        </Wrapper>
    );
}

export default SongText;
