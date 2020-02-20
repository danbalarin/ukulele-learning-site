import { configure, addDecorator } from '@storybook/react';
import ThemeDecorator from './theme';

addDecorator(ThemeDecorator);
configure(require.context('../modules', true, /\.stories\.tsx$/), module);
