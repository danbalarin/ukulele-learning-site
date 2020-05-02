import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import DisplayBox from './DisplayBox';

storiesOf('Look/DisplayBox', module)
    .addDecorator(withKnobs)
    .add('Basic', () => {
        const heading = text('Heading', 'Sample heading');
        return (
            <DisplayBox
                children={
                    <img
                        src="https://i.picsum.photos/id/227/300/300.jpg"
                        alt="placeholder"
                    />
                }
                heading={heading}
            />
        );
    });
