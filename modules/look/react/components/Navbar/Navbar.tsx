import React, { ReactElement } from 'react';

import { Flex } from '@chakra-ui/core';

interface Props {
    variantColor?: string;
    color?: string;
    left?: React.ReactNode;
    center?: React.ReactNode;
    right?: React.ReactNode;
}

function Navbar({
    variantColor,
    color,
    left,
    center,
    right,
}: Props): ReactElement {
    return (
        <Flex
            backgroundColor={variantColor || 'blue.500'}
            w="100%"
            paddingX={3}
            paddingY={2}
            justifyContent="space-between"
            alignItems="center"
            position="fixed"
        >
            <Flex children={left} />
            <Flex children={center} />
            <Flex children={right} />
        </Flex>
    );
}

export default Navbar;
