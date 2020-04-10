import React, { ReactElement } from 'react';

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

function StrumComponent({ strum, color }: Props): ReactElement {
    let component = <></>;
    switch (strum) {
        case Strum.D:
            component = <Icon color={color} name="chevron-down" size="2x" />;
            break;
        case Strum.U:
            component = <Icon color={color} name="chevron-up" size="2x" />;
            break;
        case Strum.T:
            component = <Icon color={color} name="hand-paper" size="2x" />;
            break;
        case Strum['-']:
            component = <Icon color={color} name="minus" size="2x" />;
            break;
    }
    return component;
}

export default StrumComponent;
