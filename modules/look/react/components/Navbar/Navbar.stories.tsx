import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';

import Navbar from './Navbar';
import { Button } from '../Button';

storiesOf('Look/Navbar', module)
    .addDecorator(withKnobs)
    .add('Basic', () => {
        const backgroundOptions = [
            'red.500',
            'blue.500',
            'orange.500',
            'yellow.500',
            'green.500',
            'purple.500',
        ];

        const backgroundSelect = select(
            'Background color',
            backgroundOptions,
            'purple.500'
        );

        return (
            <Navbar
                variantColor={backgroundSelect}
                left={<Button variantColor="green">Left</Button>}
                center={<Button variantColor="green">Center</Button>}
                right={<Button variantColor="green">Right</Button>}
            />
        );
    });
