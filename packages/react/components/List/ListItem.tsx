import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { useColorMode, Theme } from '@uls/look-react';

export interface ListItemProps {
    /**
     * List item heading
     */
    label: string;

    /**
     * Path where will be redirected after click
     */
    linkTo: string;

    /**
     * Optional item description, subheader
     */
    description?: string;
}

function ListItem({ label, description, linkTo }: ListItemProps): ReactElement {
    const { colorMode } = useColorMode();
    const Wrapper = styled(Link)`
        :hover {
            background-color: rgba(0, 0, 0, 0.2);
        }
        border-left: 2px solid ${Theme.modes?.[colorMode]?.color};
        width: 100%;
        padding: 10px;
        margin: 2px 5px;
    `;
    const Title = styled.div`
        font-weight: ${Theme.fontWeights.bold};
        font-size: ${Theme.fontSizes.md};
    `;

    const Description = styled.div`
        font-weight: ${Theme.fontWeights.normal};
        font-size: ${Theme.fontSizes.sm};
        opacity: 0.95;
    `;

    return (
        <Wrapper to={linkTo}>
            <Title>{label}</Title>
            {description ? <Description>{description}</Description> : <></>}
        </Wrapper>
    );
}
export default ListItem;
