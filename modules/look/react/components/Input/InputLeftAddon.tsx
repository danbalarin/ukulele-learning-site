import React, { ReactElement } from 'react';

import { InputLeftAddon as ChakraInputLeftAddon } from '@chakra-ui/core';

interface Props {
    children: React.ReactNode;
}

function InputLeftAddon({ ...props }: Props): ReactElement {
    return <ChakraInputLeftAddon {...props} />;
}

export default InputLeftAddon;
