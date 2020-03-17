import React, { ReactElement } from 'react';

import { EditableInput as ChakraEditableInput } from '@chakra-ui/core';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

function EditableInput(props: Props): ReactElement {
    return <ChakraEditableInput {...props} />;
}

export default EditableInput;
