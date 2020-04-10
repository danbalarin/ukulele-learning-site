import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

import Metronome from './Metronome';

const Wrapper = styled.div`
    border: 1px solid black;
    background-color: gray;
    padding: 10px;
    width: 250px;
`;

storiesOf('Ukulele/Metronome', module)
    .addDecorator(withKnobs)
    .addDecorator(storyFn => <Wrapper children={storyFn()} />)
    .add('Basic', () => {
        return <Metronome />;
    })
    .add('Predefined tempo', () => {
        const tempo = number('Tempo', 120);
        return <Metronome tempo={tempo} />;
    })
    .add('Halftick callback', () => {
        return <Metronome halfTick={action('metronome-halftick')} />;
    });
