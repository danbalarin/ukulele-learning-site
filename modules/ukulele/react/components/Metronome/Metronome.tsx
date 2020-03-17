import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import {
    Input,
    InputGroup,
    Button,
    Icon,
    InputLeftAddon,
    useColorMode,
    Theme,
    useInterval,
} from '@uls/look-react';

import { useAudio } from '../../hooks/useAudio';

import tick from './tick.mp3';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const DotsWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    padding: 50px 0;
`;

interface DotProps {
    mode: string;
    isActive?: boolean;
}

const mapThemeToColor = (props: DotProps) => {
    if (props.isActive) {
        return (Theme.modes && Theme.modes[props.mode].primary) || 'red';
    }
    return 'rgba(255,255,255,.2)';
};

const Dot = styled.span<DotProps>`
    height: 30px;
    width: 30px;
    background-color: ${mapThemeToColor};
    border-radius: 50%;
    display: inline-block;
`;

interface Props {
    tempo?: number;
}

function Metronome({ tempo }: Props): ReactElement {
    const [isOn, setIsOn] = useState(false);
    const [activeDot, setActiveDot] = useState(0);
    const [actualTempo, setActualTempo] = useState(tempo || 100);
    const { colorMode } = useColorMode();
    const [playing, toggle] = useAudio(tick);

    useInterval(
        function() {
            setActiveDot((activeDot + 1) % 4);
            toggle();
        },
        isOn ? (1000 * 60) / actualTempo : null
    );

    const startStop = () => {
        if (isOn) {
            setActiveDot(0);
        }
        setIsOn(!isOn);
    };

    const handleTempoChange = (event: React.FormEvent<HTMLInputElement>) => {
        setActualTempo(+event.currentTarget.value);
    };

    return (
        <Wrapper>
            <DotsWrapper>
                <Dot mode={colorMode} isActive={activeDot === 0} />
                <Dot mode={colorMode} isActive={activeDot === 1} />
                <Dot mode={colorMode} isActive={activeDot === 2} />
                <Dot mode={colorMode} isActive={activeDot === 3} />
            </DotsWrapper>
            <InputGroup>
                <InputLeftAddon>Tempo</InputLeftAddon>
                <Input
                    type="number"
                    value={actualTempo}
                    onChange={handleTempoChange}
                    name="tempo"
                    max="300"
                    min="30"
                />
                <Button onClick={startStop} variant="solid">
                    <Icon name={isOn ? 'close' : 'check'} />
                </Button>
            </InputGroup>
        </Wrapper>
    );
}

export default Metronome;
