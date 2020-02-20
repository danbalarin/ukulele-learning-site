import React, { ReactElement } from 'react';
import { FormControl as ChakraFormControl } from '@chakra-ui/core';

interface Props {
    isInvalid?: boolean;
    children: React.ReactNode;
}

function FormControl(props: Props): ReactElement {
    return <ChakraFormControl {...props} />;
}

export default FormControl;
