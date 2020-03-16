import { createGlobalStyle } from 'styled-components';
import { theme, DefaultTheme } from '@chakra-ui/core';

import { ModalTheme } from './components/Modal';
import { ButtonTheme } from './components/Button/Button';

import gothamRounded from './fonts/GothamRounded';
import ubuntuMono from './fonts/UbuntuMono';

type Breakpoints = { breakpoints: string[] };

interface ModeTheme {
    background?: string;
    color?: string;
    primary?: string;
    secondary?: string;
}

type ModesTheme = { [name: string]: ModeTheme };

interface InternalTheme {
    modal?: ModalTheme;
    button?: ButtonTheme;
    modes?: ModesTheme;
    contentMinWidth?: string;
}

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
const fonts = {
    body: 'GothamRounded, sans-serif',
    heading: 'GothamRounded, sans-serif',
    mono: 'UbuntuMono, Courier New',
};

const modes: ModesTheme = {
    light: {
        background: '#f3ffbd',
        color: colors.gray[700],
    },
    dark: {
        background: colors.purple[600],
        color: colors.white,
    },
};

const customTheme: Omit<DefaultTheme, 'breakpoints'> &
    Breakpoints &
    InternalTheme = {
    ...theme,
    colors,
    breakpoints,
    modal,
    button,
    modes,
    contentMinWidth: breakpoints[1],
};

interface GlobalStyleProps {
    colorsMode: string;
}

const getValue = (value: keyof ModeTheme) => {
    return (props: GlobalStyleProps & any) => {
        return customTheme.modes?.[props.colorMode]?.[value];
    };
};

export const GlobalStyle = createGlobalStyle<{ colorMode: string }>`
    ${gothamRounded}
    ${ubuntuMono}
    body{
        background: ${getValue('background')};
        color:${getValue('color')};
        min-width: ${customTheme.contentMinWidth};
    }
`;

export default customTheme;
