import React, { ReactElement } from 'react';
import { FormErrorMessage as ChakraFormErrorMessage } from '@chakra-ui/core';

interface Props {
    children: React.ReactNode;
    show?: boolean;
}

function FormErrorMessage({ show, ...props }: Props): ReactElement {
    if (!show) {
        return <></>;
    }
    return <ChakraFormErrorMessage {...props} />;
}

export default FormErrorMessage;
