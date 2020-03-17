import React, { ReactElement } from 'react';

import { EditablePreview as ChakraEditablePreview } from '@chakra-ui/core';

interface Props {}

function EditablePreview({}: Props): ReactElement {
    return <ChakraEditablePreview />;
}

export default EditablePreview;
