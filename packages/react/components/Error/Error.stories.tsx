import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import { IconName } from '@uls/look-react';

import Error from './Error';

storiesOf('Package/Error', module)
    .addDecorator(withKnobs)
    .add('With icon', () => {
        const title = text('Title', '404');
        const subtitle = text('Subtitle', 'Not found');
        const icon = text('Icon', 'times');
        return (
            <Error title={title} subtitle={subtitle} icon={icon as IconName} />
        );
    })
    .add('With image', () => {
        const title = text('Title', '404');
        const subtitle = text('Subtitle', 'Not found');
        const image = text('Image', 'http://google.com');
        return <Error title={title} subtitle={subtitle} image={image} />;
    });
