import React, { ReactElement } from 'react';

import { MenuGroup as ChakraMenuGroup } from '@chakra-ui/core';

interface Props {
    label?: string;
    children: React.ReactNode;
}

function MenuGroup({ ...props }: Props): ReactElement {
    return <ChakraMenuGroup {...props} />;
}

export default MenuGroup;
