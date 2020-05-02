import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import styled from '@emotion/styled';

import Chord from './Chord';
import { Tone } from '@uls/ukulele-common';

const chordsKnobLabel = 'Chord';
const chordsKnobOptions = {
    G: {
        name: 'G',
        strings: [Tone.G, Tone.D, Tone.G, Tone.H],
    },
    F: {
        name: 'F',
        strings: [Tone.A, Tone.C, Tone.F, Tone.A],
    },
    D: {
        name: 'D',
        strings: [Tone.A, Tone.D, Tone.Gb, Tone.A],
    },
};
const chordsKnobDefaultValue = chordsKnobOptions.G;

const toneOptions = {};
Object.keys(Tone).forEach(
    key => typeof Tone[key] !== 'number' && (toneOptions[Tone[key]] = key)
);
const toneDefaultValue = toneOptions[Tone.G];

const Wrapper = styled.div`
    background-color: white;
`;

storiesOf('Ukulele/Chord', module)
    .addDecorator(withKnobs)
    .add('Default tuning', () => {
        const chord = select(
            chordsKnobLabel,
            chordsKnobOptions,
            chordsKnobDefaultValue
        );
        return (
            <Wrapper>
                Chord: {chord.name}
                <Chord chord={chord} />
            </Wrapper>
        );
    })
    .add('Custom tuning', () => {
        const chord = select(
            chordsKnobLabel,
            chordsKnobOptions,
            chordsKnobDefaultValue,
            'GROUP-ID1'
        );
        const strumOne = select(
            'First strum tone',
            toneOptions,
            toneDefaultValue
        );
        const strumTwo = select(
            'Second strum tone',
            toneOptions,
            toneDefaultValue
        );
        const strumThree = select(
            'Third strum tone',
            toneOptions,
            toneDefaultValue
        );
        const strumFour = select(
            'Fourth strum tone',
            toneOptions,
            toneDefaultValue
        );
        return (
            <Wrapper>
                Chord: {chord.name}
                <Chord
                    chord={chord}
                    tuning={[strumOne, strumTwo, strumThree, strumFour]}
                />
            </Wrapper>
        );
    });
