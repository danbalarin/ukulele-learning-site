import { configure, addDecorator } from '@storybook/react';
import ThemeDecorator from './theme';

const req = require.context('../', true, /\.stories\.tsx$/);

const loadStories = () => req.keys().forEach(filename => req(filename));

addDecorator(ThemeDecorator);

configure(loadStories, module);
