import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

import { ComponentWrapper } from '@uls/look-react';
import { Metronome } from '@uls/ukulele-react';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface Props {}

function MetronomePage({}: Props): ReactElement {
    return (
        <Wrapper>
            <ComponentWrapper title="Metronome">
                <Metronome />
            </ComponentWrapper>
        </Wrapper>
    );
}

export default MetronomePage;
