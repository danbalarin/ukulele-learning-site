import { StrummingPattern } from '../entities/StrummingPattern';
import { StrummingPatternInteractor } from './StrummingPatternInteractor';

let spi: StrummingPatternInteractor;

const strummingPattern: StrummingPattern = {
    pattern: [1],
    metronomePreset: {
        tempo: 100,
    },
};

beforeEach(() => {
    spi = new StrummingPatternInteractor(strummingPattern);
});

it('should update values', () => {
    const pattern: Partial<StrummingPattern> = {
        pattern: [0],
    };

    const metronomePreset: Partial<StrummingPattern> = {
        metronomePreset: {
            tempo: 120,
        },
    };

    const strummingPatternPattern = spi.update(pattern);
    const strummingPatternMetronomePreset = spi.update(metronomePreset);

    expect(strummingPatternPattern).toEqual({
        ...strummingPattern,
        pattern: [0],
    });
    expect(strummingPatternMetronomePreset).toEqual({
        ...strummingPattern,
        metronomePreset: { tempo: 120 },
    });
});
