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
    faUser,
    faSignOutAlt,
    faFrown,
    faMicrophoneAlt,
    faMusic,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';

// import { faFrown } from '@fortawesome/free-regular-svg-icons';

library.add(
    faChevronDown,
    faChevronUp,
    faTimes,
    faSun,
    faMoon,
    faHandPaper,
    faMinus,
    faCheck,
    faFrown,
    faUser,
    faSignOutAlt,
    faMicrophoneAlt,
    faMusic,
    faUsers
);

export { IconName };

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
