import React, { ReactElement } from 'react';

import { Menu as ChakraMenu } from '@chakra-ui/core';

interface Props {
    children: React.ReactNode;
}

function Menu({ ...props }: Props): ReactElement {
    return <ChakraMenu {...props} />;
}

export default Menu;
