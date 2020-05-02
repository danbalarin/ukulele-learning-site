import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from '@emotion/styled';

import { Strum } from '@uls/ukulele-common';

import { default as StrumComponent } from './Strum';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
`;

storiesOf('Ukulele/Strum', module).add('Basic', () => {
    return (
        <Wrapper>
            <div>
                D:
                <StrumComponent strum={Strum.D} />
            </div>
            <div>
                U:
                <StrumComponent strum={Strum.U} />
            </div>
            <div>
                T:
                <StrumComponent strum={Strum.T} />
            </div>
            <div>
                -:
                <StrumComponent strum={Strum['-']} />
            </div>
        </Wrapper>
    );
});
