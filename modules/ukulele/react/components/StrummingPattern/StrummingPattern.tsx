import React, {
    ReactElement,
    useState,
    useImperativeHandle,
    forwardRef,
    useEffect,
} from 'react';
import styled from '@emotion/styled';

import {
    useColorMode,
    Theme,
} from '@uls/look-react';
import { StrummingPattern, Strum } from '@uls/ukulele-common';

import { Strum as StrumComponent } from '../Strum';

const defaultStrummingPattern = {
    pattern: [
        Strum.D,
        Strum.U,
        Strum.D,
        Strum.U,
        Strum.D,
        Strum.U,
        Strum.D,
        Strum.U,
    ],
};

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const StrumWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    padding: 10px 0;
`;

interface Props {
    /**
     * Strumming pattern to display
     */
    strummingPattern?: StrummingPattern;

    /**
     * Callback called after strumming pattern change
     */
    onChange?: (newValue: StrummingPattern) => void;
}

function StrummingPatternComponent(
    { strummingPattern, onChange }: Props,
    ref: React.Ref<any>
): ReactElement {
    const [position, setPosition] = useState(0);
    const [actuallStrummingPattern, setActuallStrummingPattern] = useState<
        StrummingPattern
    >(strummingPattern || defaultStrummingPattern);
    const { colorMode } = useColorMode();

    useEffect(() => {
        onChange && onChange(actuallStrummingPattern);
    }, [actuallStrummingPattern]);

    const tick = function(nextPos: number) {
        setPosition(nextPos);
    };

    useImperativeHandle(ref, () => ({
        tick,
    }));

    const activeColor =
        colorMode === 'dark'
            ? Theme.colors.purple['800']
            : Theme.colors.orange['500'];

    return (
        <Wrapper>
            <StrumWrapper>
                {actuallStrummingPattern.pattern.map((strum, i) => (
                    <StrumComponent
                        strum={strum}
                        key={i}
                        color={position === i ? activeColor : ''}
                    />
                ))}
            </StrumWrapper>
        </Wrapper>
    );
}

export default forwardRef(StrummingPatternComponent);
