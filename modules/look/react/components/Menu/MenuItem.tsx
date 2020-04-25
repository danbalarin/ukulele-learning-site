import React, { ReactElement } from 'react';

import { MenuItem as ChakraMenuItem } from '@chakra-ui/core';

interface Props {
    children: React.ReactNode;
    onClick?: (event: any) => void;
}

function MenuItem({ ...props }: Props): ReactElement {
    return <ChakraMenuItem {...props} />;
}

export default MenuItem;
