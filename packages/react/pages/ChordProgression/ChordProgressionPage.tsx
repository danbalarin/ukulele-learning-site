import React, { ReactElement, useState, useRef } from 'react';
import styled from 'styled-components';

import { ComponentWrapper } from '@uls/look-react';
import {
    Metronome,
    StrummingPattern as StrummingPatternComponent,
} from '@uls/ukulele-react';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

interface Props {}

function ChordProgressionPage({}: Props): ReactElement {
    const strummingPatternRef = useRef<any>();

    return (
        <Wrapper>
            <div>chords</div>
            <ComponentWrapper title="Metronome">
                <StrummingPatternComponent ref={strummingPatternRef} />
                <Metronome
                    halfTick={number =>
                        strummingPatternRef.current?.tick(number)
                    }
                />
            </ComponentWrapper>
        </Wrapper>
    );
}

export default ChordProgressionPage;
