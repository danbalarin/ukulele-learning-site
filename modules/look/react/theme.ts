import { theme, DefaultTheme } from '@chakra-ui/core';

const customTheme: DefaultTheme = {
    ...theme,
    colors: {
        ...theme.colors,
        blue: {
            ...theme.colors.blue,
            500: '#4b7bec',
        },
        orange: {
            ...theme.colors.orange,
            500: '#fd9644',
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
};

export default customTheme;
