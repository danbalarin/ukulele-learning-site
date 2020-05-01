import React, { ReactElement } from 'react';

import { ThemeProvider, ColorModeProvider, CSSReset } from '@uls/look-react';
import { Layout } from './components/Layout';

interface Props {}

function App({}: Props): ReactElement {
    return (
        <ThemeProvider>
            <ColorModeProvider value="dark">
                <CSSReset />
                <Layout />
            </ColorModeProvider>
        </ThemeProvider>
    );
}

export default App;
