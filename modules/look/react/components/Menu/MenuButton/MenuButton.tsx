import React, { ReactElement, forwardRef } from 'react';

import { MenuButton as ChakraMenuButton } from '@chakra-ui/core';

interface Props {
    children?: React.ReactNode;
    rightIcon?: string;
    leftIcon?: string;
    as?: React.ElementType;
}

function MenuButton({ ...props }: Props, ref: React.Ref<any>): ReactElement {
    return <ChakraMenuButton {...props} ref={ref} />;
}

export default forwardRef(MenuButton);
