import { theme, DefaultTheme } from '@chakra-ui/core';

import { ModalTheme } from './components/Modal';
import { ButtonTheme } from './components/Button/Button';

interface InternalTheme {
    modal?: ModalTheme;
    button?: ButtonTheme;
}

const customTheme: DefaultTheme & InternalTheme = {
    ...theme,
    colors: {
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
            ...theme.colors.purple,
            500: '#a55eea',
        },
    },
    modal: {
        border: {
            borderRadius: '10px',
        },
    },
    button: {
        defaultVariant: 'outline',
        outline: {
            border: {
                borderWidth: '3px',
            },
        },
    },
};

export default customTheme;
