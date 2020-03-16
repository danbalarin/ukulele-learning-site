import React, { ReactElement } from 'react';

import { ThemeProvider, ColorModeProvider } from '@uls/look-react';
import { Layout } from './components/Layout';

interface Props {}

function App({}: Props): ReactElement {
    return (
        <ThemeProvider>
            <ColorModeProvider value="dark">
                <Layout />
            </ColorModeProvider>
        </ThemeProvider>
    );
}

export default App;
