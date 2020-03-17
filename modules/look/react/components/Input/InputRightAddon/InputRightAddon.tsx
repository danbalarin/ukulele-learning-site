import React, { ReactElement } from 'react';

import { InputRightAddon as ChakraInputRightAddon } from '@chakra-ui/core';

interface Props {
    children: React.ReactNode;
}

function InputRightAddon({ ...props }: Props): ReactElement {
    return <ChakraInputRightAddon {...props} />;
}

export default InputRightAddon;
