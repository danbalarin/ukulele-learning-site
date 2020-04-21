import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

import customTheme from '../../theme';
import { useColorMode } from '../../hooks/useColorMode';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
`;

interface Props {
    heading: React.ReactNode;

    children: React.ReactNode;
}

function DisplayBox({ heading, children }: Props): ReactElement {
    const { colorMode } = useColorMode();

    const HeadingWrapper = styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
        border-bottom: 2px solid ${customTheme?.modes?.[colorMode]?.background};
    `;

    return (
        <Wrapper>
            <HeadingWrapper children={heading} />
            {children}
        </Wrapper>
    );
}

export default DisplayBox;
