import React, { ReactElement } from 'react';
import { Button as ChakraButton } from '@chakra-ui/core';

import { Sizes, Spacing } from '../../utils';

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

function Button({ children, ...props }: ButtonProps): ReactElement {
    return <ChakraButton {...props}>{children}</ChakraButton>;
}

export default Button;
