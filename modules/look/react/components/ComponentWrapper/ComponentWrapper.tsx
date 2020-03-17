import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { Card } from '@uls/look-react';

const Wrapper = styled.div`
    width: 250px;
`;

interface Props {
    title: React.ReactNode;
    children: React.ReactNode;
}

function ComponentWrapper({ title, children }: Props): ReactElement {
    return (
        <Wrapper>
            <Card header={title} children={children} />
        </Wrapper>
    );
}

export default ComponentWrapper;
