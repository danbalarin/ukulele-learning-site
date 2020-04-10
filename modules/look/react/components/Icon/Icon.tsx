import React, { ReactElement } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName, SizeProp } from '@fortawesome/fontawesome-svg-core';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faChevronDown,
    faChevronUp,
    faTimes,
    faSun,
    faMoon,
    faHandPaper,
    faMinus,
    faCheck,
} from '@fortawesome/free-solid-svg-icons';

library.add(
    faChevronDown,
    faChevronUp,
    faTimes,
    faSun,
    faMoon,
    faHandPaper,
    faMinus,
    faCheck
);

interface Props {
    /**
     * Icon name
     */
    name: IconName;

    /**
     * Icon size, all css atributes acceptable
     */
    size?: SizeProp;

    /**
     * Icon color
     */
    color?: string;
}

function Icon({ name, ...props }: Props): ReactElement {
    return <FontAwesomeIcon {...props} icon={name} />;
}

export default Icon;
