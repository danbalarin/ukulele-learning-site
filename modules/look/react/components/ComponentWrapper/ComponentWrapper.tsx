import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

import { Card } from '@uls/look-react';

const Wrapper = styled.div<{ width?: string }>`
    width: ${props => (props.width ? props.width : '250px')};
    min-width: 250px;
`;

interface Props {
    /**
     * Title shown in header of component wrapper
     */
    title: React.ReactNode;

    /**
     * Component wrapper body
     */
    children: React.ReactNode;

    /**
     * Optional CSS width property
     */
    width?: string;
}

function ComponentWrapper({ title, children, width }: Props): ReactElement {
    return (
        <Wrapper width={width}>
            <Card header={title} children={children} />
        </Wrapper>
    );
}

export default ComponentWrapper;
