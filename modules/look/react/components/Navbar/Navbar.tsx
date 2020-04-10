import React, { ReactElement } from 'react';

import { Flex } from '@chakra-ui/core';
import Theme from '../../theme';
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
    const bgColor = variantColor || Theme.modes?.[colorMode]?.topbarBackground;

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
            <Flex children={left} flex="1" justifyContent="flex-start" />
            <Flex children={center} flex="1" justifyContent="center" />
            <Flex children={right} flex="1" justifyContent="flex-end" />
        </Flex>
    );
}

export default Navbar;
