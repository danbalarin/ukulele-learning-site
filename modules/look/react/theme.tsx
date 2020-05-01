import { css } from '@emotion/core';
import { theme, DefaultTheme } from '@chakra-ui/core';

import { ModalTheme } from './components/Modal';
import { ButtonTheme } from './components/Button/Button';
import { CardTheme } from './components/Card/Card';

import gothamRounded from './fonts/GothamRounded';
import ubuntuMono from './fonts/UbuntuMono';

import bg from './images/bg.png';

type Breakpoints = { breakpoints: string[] };

interface ModeTheme {
    background?: string;
    containerBackground?: string;
    topbarBackground?: string;
    color?: string;
    primary?: string;
    secondary?: string;
}

type ModesTheme = { [name: string]: ModeTheme };

interface InternalTheme {
    modal?: ModalTheme;
    button?: ButtonTheme;
    modes?: ModesTheme;
    card?: CardTheme;
    contentMinWidth?: string;
}

const fontSizes = {
    ...theme.fontSizes,
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '28px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '64px',
};

const colors = {
    ...theme.colors,
    blue: {
        ...theme.colors.blue,
        500: '#4b7bec',
    },
    orange: {
        ...theme.colors.orange,
        // 500: '#fd9644',
        500: '#ff851c',
    },
    yellow: {
        ...theme.colors.yellow,
        500: '#fed330',
    },
    green: {
        ...theme.colors.green,
        500: '#26de81',
    },
    red: {
        ...theme.colors.red,
        500: '#fc5c65',
    },
    purple: {
        50: '#ededf8',
        100: '#c9c8e9',
        200: '#a5a3db',
        300: '#807fcd',
        400: '#5c5abe',
        500: '#4341a5',
        600: '#343280',
        700: '#25245c',
        800: '#161637',
        900: '#070712',
    },
};

const breakpoints = ['30em', '48em', '62em', '80em'];

const modal: ModalTheme = {
    border: {
        borderRadius: '10px',
    },
};

const button: ButtonTheme = {
    defaultVariant: 'outline',
    outline: {
        border: {
            borderWidth: '3px',
        },
    },
};

const card: CardTheme = {
    padding: {
        padding: '5px',
    },
    background: 'rgba(255,255,255,.2)',
    border: {
        borderRadius: '10px',
        border: '2px solid rgba(255,255,255,.2)',
    },
    footer: {
        background: 'rgba(255,255,255,.2)',
        borderTop: '1px',
    },
    header: {
        background: 'rgba(255,255,255,.2)',
        borderBottom: '1px',
    },
};

const fonts = {
    body: 'GothamRounded, sans-serif',
    heading: 'GothamRounded, sans-serif',
    mono: 'UbuntuMono, Courier New',
};

const modes: ModesTheme = {
    light: {
        background: '#F2D785',
        containerBackground: '#F2A057',
        topbarBackground: '#444059',
        color: '#A66C4B',
        primary: colors.orange[500],
    },
    dark: {
        background: '#2F0459',
        containerBackground: '#57078C',
        topbarBackground: '#0A2740',
        color: '#FF13FE',
        primary: '#00bcb8',
    },
};

const customTheme: Omit<DefaultTheme, 'breakpoints'> &
    Breakpoints &
    InternalTheme = {
    ...theme,
    fontSizes,
    colors,
    breakpoints,
    modal,
    button,
    modes,
    fonts,
    card,
    contentMinWidth: breakpoints[1],
};

export const createGlobalStyle = (
    colorMode: string,
    disableBgImage?: boolean
) => css`
    ${gothamRounded}
    ${ubuntuMono}
    body {
        background: ${customTheme.modes?.[colorMode].background};
        ${!disableBgImage ? `background-image: url(${bg});` : ''};
        color: ${customTheme.modes?.[colorMode].color};
        min-width: ${customTheme.contentMinWidth};
        font-size: ${customTheme.fontSizes.md};
    }
`;

export default customTheme;
