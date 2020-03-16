import React, { ReactElement } from 'react';

import { Flex } from '@chakra-ui/core';
import customTheme from '../../theme';
import { useColorMode } from '../../hooks/useColorMode';

interface Props {
    variantColor?: string;
    color?: string;
    left?: React.ReactNode;
    center?: React.ReactNode;
    right?: React.ReactNode;
}

function Navbar({
    variantColor,
    left,
    center,
    right,
    ...props
}: Props): ReactElement {
    const { colorMode } = useColorMode();
    const color = {
        dark: customTheme.colors.purple[700],
        light: customTheme.colors.teal[500],
    };
    const bgColor = variantColor || color[colorMode];

    return (
        <Flex
            {...props}
            backgroundColor={bgColor}
            w="100%"
            paddingX={3}
            paddingY={2}
            justifyContent="space-between"
            alignItems="center"
            position="fixed"
            zIndex={10}
        >
            <Flex children={left} />
            <Flex children={center} />
            <Flex children={right} />
        </Flex>
    );
}

export default Navbar;
