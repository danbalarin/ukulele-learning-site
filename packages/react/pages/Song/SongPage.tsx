import React, { ReactElement } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps<{ id: string }> {}

function SongPage({}: Props): ReactElement {
    return <div></div>;
}

export default SongPage;
