import React, { ReactElement } from 'react';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { Margins, Sizes } from '../../utils';
import { useColorMode } from '../../hooks/useColorMode';

interface Props extends Margins {
    size?: Sizes;
}

function ColorSwitch(props: Props): ReactElement {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Button {...props} onClick={toggleColorMode} variant="ghost">
            <Icon name={colorMode === 'light' ? 'moon' : 'sun'} />
        </Button>
    );
}

export default ColorSwitch;
