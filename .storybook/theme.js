import React from 'react';
import { ThemeProvider } from '../modules/look/react';

const ThemeDecorator = storyFn => <ThemeProvider>{storyFn()}</ThemeProvider>;

export default ThemeDecorator;
