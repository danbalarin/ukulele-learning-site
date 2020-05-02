import React from 'react';
import { storiesOf } from '@storybook/react';

import ColorSwitch from './ColorSwitch';

storiesOf('Look/ColorSwitch', module).add('Basic switch', () => {
    return <ColorSwitch />;
});
