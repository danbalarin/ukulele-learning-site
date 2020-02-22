import React, { ReactElement } from 'react';
import {
    Modal as ChakraModal,
    ModalOverlay,
    ModalBody,
    ModalHeader,
    ModalFooter,
    ModalContent,
    ModalCloseButton,
} from '@chakra-ui/core';

import theme from '../../theme';
import { BorderTheme } from '../../utils';

export interface ModalTheme {
    border: BorderTheme;
}

interface Props {
    hasCloseButton?: boolean;
    children: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    onClose?: () => void;
}

function Modal({
    children,
    header,
    footer,
    hasCloseButton,
    ...props
}: Props): ReactElement {
    return (
        <ChakraModal {...props}>
            <ModalOverlay />
            <ModalContent borderRadius={theme?.modal?.border?.borderRadius}>
                {header && <ModalHeader children={header} />}
                {hasCloseButton && <ModalCloseButton />}
                <ModalBody children={children} />
                {footer && <ModalFooter children={footer} />}
            </ModalContent>
        </ChakraModal>
    );
}

export default Modal;
