import React, { ReactElement } from 'react';
import styled from 'styled-components';

import theme from '../../theme';
import { Paddings, BorderTheme, BackgroundTheme } from '../../utils';

export interface CardTheme extends BackgroundTheme {
    padding?: Paddings;
    border?: BorderTheme;
    header?: BorderTheme & BackgroundTheme;
    footer?: BorderTheme & BackgroundTheme;
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background: ${theme?.card?.background};
    border: ${theme?.card?.border?.border};
    border-radius: ${theme?.card?.border?.borderRadius};
    display: flex;
    flex-direction: column;
`;

const HeaderWrapper = styled.div`
    width: 100%;
    padding: ${theme?.card?.padding?.padding};
    background: ${theme?.card?.header?.background};
    border: ${theme?.card?.header?.border};
    border-radius: ${theme?.card?.header?.borderRadius};
`;

const BodyWrapper = styled.div`
    width: 100%;
    padding: ${theme?.card?.padding?.padding};
`;

const FooterWrapper = styled.div`
    width: 100%;
    padding: ${theme?.card?.padding?.padding};
    background: ${theme?.card?.footer?.background};
    border: ${theme?.card?.footer?.border};
    border-radius: ${theme?.card?.footer?.borderRadius};
`;

interface Props {
    header?: React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

function Card({ header, children, footer }: Props): ReactElement {
    return (
        <Wrapper>
            {header && <HeaderWrapper children={header} />}
            <BodyWrapper children={children} />
            {footer && <FooterWrapper children={footer} />}
        </Wrapper>
    );
}

export default Card;
