import React, { ReactElement, useRef, useEffect } from 'react';
import styled from '@emotion/styled';

import { Chord, Tone } from '@uls/ukulele-common';
import { useColorMode, Theme } from '@uls/look-react';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface ChordComponentProps {
    chord: Chord;
    tuning?: [Tone, Tone, Tone, Tone];
}

function ChordComponent({
    chord,
    tuning: propTuning,
}: ChordComponentProps): ReactElement {
    const tuning = propTuning || [Tone.G, Tone.C, Tone.E, Tone.A];

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const parentDivRef = useRef<HTMLDivElement>(null);
    const { colorMode } = useColorMode();

    let ctx: CanvasRenderingContext2D | null;
    useEffect(() => {
        if (canvasRef.current) {
            ctx = canvasRef.current.getContext('2d');
            ctx && draw();
        }
    }, []);

    const imperfection = 4;
    const fretHeight = 24;
    const lineBoxSize = 20;
    const fontSize = 20;
    const headerHeight = 24;
    const defaultWidth = lineBoxSize * 4;
    const defaultHeight = headerHeight + fretHeight * 4 + 2 * imperfection;

    const themeColors = Theme.modes?.[colorMode];
    const fretColor = themeColors?.background || 'gray';
    const strumColor = themeColors?.color || 'black';
    const strumToneColor = themeColors?.color || 'black';
    const fingerColor = themeColors?.primary || 'red';

    const drawStrum = (nth: number, tone: string, holdFret: number) => {
        if (!ctx) {
            return;
        }

        ctx.font = `${fontSize}px Gotham Rounded`;
        ctx.textAlign = 'center';

        const x = lineBoxSize * nth + lineBoxSize / 2;
        // Draw strum tone
        ctx.fillStyle = strumToneColor;
        ctx.fillText(tone, x, fontSize, lineBoxSize);

        // Draw strum
        ctx.fillStyle = strumColor;
        ctx.fillRect(x, headerHeight, 2, defaultHeight - 24);

        // Draw finger position circle
        ctx.fillStyle = fingerColor;
        if (holdFret === 0) {
            return;
        }
        if (holdFret < 0) {
            holdFret += 12;
        }
        if (holdFret > 0 && holdFret < 5) {
            const y =
                headerHeight + (holdFret - 0.5) * fretHeight + imperfection;
            ctx.beginPath();
            ctx.arc(x + 1, y, 6, 0, Math.PI * 2);
            ctx.fill();
        }
    };

    const drawFret = (nth: number) => {
        if (!ctx) {
            return;
        }
        ctx.fillStyle = fretColor;
        const y = fretHeight * nth + 24 + imperfection;
        ctx.fillRect(
            lineBoxSize / 2 - imperfection,
            y,
            lineBoxSize * 3 + imperfection * 2,
            2
        );
    };

    const setSizeAndScale = () => {
        if (canvasRef.current && parentDivRef.current && ctx) {
            const scaleX = parentDivRef.current.clientWidth / defaultWidth;
            const scaleY = parentDivRef.current.clientHeight / defaultHeight;
            if (scaleX > scaleY) {
                canvasRef.current.width = defaultWidth * scaleY;
                canvasRef.current.height = defaultHeight * scaleY;
                ctx.scale(scaleY, scaleY);
            } else {
                canvasRef.current.width = defaultWidth * scaleX;
                canvasRef.current.height = defaultHeight * scaleX;
                ctx.scale(scaleX, scaleX);
            }
        }
    };

    const draw = () => {
        setSizeAndScale();

        for (let i = 0; i < 5; ++i) {
            drawFret(i);
        }

        tuning.forEach((tone, index) => {
            drawStrum(index, Tone[tone], chord.strings[index] - tone);
        });
    };

    return (
        <Wrapper ref={parentDivRef}>
            <canvas ref={canvasRef} />
        </Wrapper>
    );
}

export default ChordComponent;
