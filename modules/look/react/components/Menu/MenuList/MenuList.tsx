import React, { ReactElement } from 'react';

import { MenuList as ChakraMenuList } from '@chakra-ui/core';

interface Props {
    children: React.ReactNode;
}

function MenuList({ ...props }: Props): ReactElement {
    return <ChakraMenuList {...props} />;
}

export default MenuList;
