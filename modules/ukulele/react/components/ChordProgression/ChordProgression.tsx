import React, {
    ReactElement,
    forwardRef,
    useImperativeHandle,
    useState,
} from 'react';

import { ChordProgression } from '@uls/ukulele-common';

interface Props {
    /**
     * Chord progression to be displayed
     */
    chordProgression: ChordProgression<any>;
}

function ChordProgressionComponent(
    { chordProgression }: Props,
    ref: React.Ref<any>
): ReactElement {
    const [position, setPosition] = useState(0);

    const tick = function() {
        // const nextPos = position + 1 > chordProgression.
    };

    useImperativeHandle(ref, () => ({
        tick,
    }));

    return <div></div>;
}

export default forwardRef(ChordProgressionComponent);
