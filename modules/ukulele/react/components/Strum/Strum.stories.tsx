import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { default as StrumComponent } from './Strum';
import { Strum } from '@uls/ukulele-common';

storiesOf('Ukulele/Strum', module)
    .addDecorator(withKnobs)
    .add('Basic', () => {
        return (
            <>
                <StrumComponent strum={Strum.D} />
                <StrumComponent strum={Strum.U} />
                <StrumComponent strum={Strum.T} />
                <StrumComponent strum={Strum['-']} />
            </>
        );
    });
