import * as React from 'react';

import { ThemeProvider, ColorModeProvider } from '@uls/look-react';
import { Layout } from './components/Layout';

export default class App extends React.Component {
    public render() {
        return (
            <ThemeProvider>
                <ColorModeProvider>
                    <Layout />
                </ColorModeProvider>
            </ThemeProvider>
        );
    }
}
