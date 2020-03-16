import React, { ReactElement } from 'react';

import { Heading as ChakraHeading } from '@chakra-ui/core';

interface Props {
    children: React.ReactNode;
    size?: 'xs' | 'sm' | 'lg' | 'xl' | '2xl' | 'md';
}

function Heading(props: Props): ReactElement {
    return <ChakraHeading {...props} />;
}

export default Heading;
