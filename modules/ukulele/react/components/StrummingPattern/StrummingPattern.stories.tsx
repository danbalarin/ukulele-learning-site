import React, { useRef, useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';

import StrummingPattern from './StrummingPattern';
import { Strum } from '@uls/ukulele-common';
import { Button } from '@uls/look-react';

storiesOf('Ukulele/StrummingPattern', module).add(
    'Basic strumming pattern',
    () => {
        const strummingPatternRef = useRef<any>();
        const [pos, setPos] = useState(0);
        useEffect(() => {
            strummingPatternRef.current?.tick(pos);
        }, [pos]);
        return (
            <>
                <Button onClick={() => setPos((pos + 1) % 4)}>Next</Button>
                <StrummingPattern
                    ref={strummingPatternRef}
                    strummingPattern={{
                        pattern: [Strum.D, Strum.U, Strum.T, Strum['-']],
                    }}
                />
            </>
        );
    }
);
