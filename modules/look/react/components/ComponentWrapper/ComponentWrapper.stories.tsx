import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import ComponentWrapper from './ComponentWrapper';

storiesOf('Ukulele/ComponentWrapper', module)
    .addDecorator(withKnobs)
    .add('Basic', () => {
        const title = text('Title', 'Component wrapper');
        return (
            <ComponentWrapper
                children={
                    <img
                        src="https://i.picsum.photos/id/227/300/300.jpg"
                        alt="placeholder"
                    />
                }
                title={title}
            />
        );
    });
