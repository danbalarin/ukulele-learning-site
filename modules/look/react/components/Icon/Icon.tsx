import React, { ReactElement } from 'react';

import { Icon as ChakraIcon } from '@chakra-ui/core';

interface Props {
    name: string;
    size?: string;
}

function Icon(props: Props): ReactElement {
    // ts ignore because of custom icons
    // @ts-ignore
    return <ChakraIcon {...props} />;
}

export default Icon;
