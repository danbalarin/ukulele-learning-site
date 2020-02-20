import React, { ReactElement } from 'react';
import { FormErrorMessage as ChakraFormErrorMessage } from '@chakra-ui/core';

interface Props {
    children: React.ReactNode;
}

function FormErrorMessage(props: Props): ReactElement {
    return <ChakraFormErrorMessage {...props} />;
}

export default FormErrorMessage;
