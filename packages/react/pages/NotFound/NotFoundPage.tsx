import React, { ReactElement } from 'react';

import { Error } from '../../components/Error';

interface Props {}

function NotFound({}: Props): ReactElement {
    return <Error title="404" subtitle="Not found" icon="frown" />;
}

export default NotFound;
