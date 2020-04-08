import React, { ReactElement } from 'react';

import { Icon as ChakraIcon } from '@chakra-ui/core';

interface Props {
    /**
     * Icon name
     */
    name: string;

    /**
     * Icon size, all css atributes acceptable
     */
    size?: string;

    /**
     * Icon color
     */
    color?: string;
}

function Icon(props: Props): ReactElement {
    // ts ignore because of custom icons
    // @ts-ignore
    return <ChakraIcon {...props} />;
}

export default Icon;
