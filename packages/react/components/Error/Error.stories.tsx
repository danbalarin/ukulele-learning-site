import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import Error from './Error';

storiesOf('Package/Error', module)
    .addDecorator(withKnobs)
    .add('With icon', () => {
        const title = text('Title', '404');
        const subtitle = text('Subtitle', 'Not found');
        const icon = text('Icon', 'cross');
        return <Error title={title} subtitle={subtitle} icon={icon} />;
    });
