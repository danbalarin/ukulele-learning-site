import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { Icon } from '@uls/look-react';
import { Strum } from '@uls/ukulele-common';

interface Props {
    /**
     * Strum to be displayed
     */
    strum: Strum;

    /**
     * Color
     */
    color?: string;
}

interface StrumWrapperProps {
    color: string;
}

const StrumWrapper = styled.span<StrumWrapperProps>`
    color: ${props => props.color};
`;

function StrumComponent({ strum, color }: Props): ReactElement {
    let component = <></>;
    console.log(color)
    switch (strum) {
        case Strum.D:
            component = <Icon color={color} name="arrow-down" size="24px" />;
            break;
        case Strum.U:
            component = <Icon color={color} name="arrow-up" size="24px" />;
            break;
        case Strum.T:
            component = <StrumWrapper color={color || ''}>T</StrumWrapper>;
            break;
        case Strum['-']:
            component = <Icon color={color} name="arrow-minus" size="24px" />;
            break;
    }
    return component;
}

export default StrumComponent;
