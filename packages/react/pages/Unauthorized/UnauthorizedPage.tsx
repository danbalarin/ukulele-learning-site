import React, { ReactElement } from 'react';

import { Error } from '../../components/Error';

interface Props {}

function Unauthorized({}: Props): ReactElement {
    return <Error title="401" subtitle="Unauthorized" icon="times" />;
}

export default Unauthorized;
