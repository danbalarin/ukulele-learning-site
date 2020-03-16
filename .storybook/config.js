import { configure, addDecorator } from '@storybook/react';
import ThemeDecorator from './theme';

addDecorator(ThemeDecorator);

configure(() => {
    const req = require.context('../', true, /\.stories\.tsx$/);
    req.keys().forEach(filename => req(filename));
}, module);
