import React, { ReactElement } from 'react';
import { Button as ChakraButton } from '@chakra-ui/core';

import { Sizes, Spacing, BorderTheme } from '../../utils';
import theme from '../../theme';

export interface ButtonTheme {
    defaultVariant?: ButtonVariant;
    outline: { border?: BorderTheme };
}

type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: Sizes;
    variant?: ButtonVariant;
    isLoading?: boolean;
    loadingText?: string;
    children: React.ReactNode;
    variantColor?: string;
    h?: Spacing;
}

function Button({ children, variant, ...props }: ButtonProps): ReactElement {
    const btnTheme = theme?.button;

    const newVariant = variant || btnTheme?.defaultVariant;

    const mappedThemeToProps = {
        // border: btnTheme?.border?.border,
        // borderRadius: btnTheme?.border?.borderRadius,
        borderWidth:
            newVariant === 'outline'
                ? btnTheme?.outline?.border?.borderWidth
                : undefined,
        variant: newVariant,
    };

    return (
        <ChakraButton {...props} {...mappedThemeToProps}>
            {children}
        </ChakraButton>
    );
}

export default Button;
