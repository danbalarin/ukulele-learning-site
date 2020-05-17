import React, { ReactElement } from 'react';

import { Heading, Icon } from '@uls/look-react';

interface Props {}

function Loading({}: Props): ReactElement {
    return (
        <>
            <Icon name="sync" size="lg" spin={true} />
            <Heading size="lg">Loading</Heading>
        </>
    );
}

export default Loading;
