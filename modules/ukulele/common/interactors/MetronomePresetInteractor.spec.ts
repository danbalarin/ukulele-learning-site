import { MetronomePreset } from '../entities/MetronomePreset';
import { MetronomePresetInteractor } from './MetronomePresetInteractor';

let mpi: MetronomePresetInteractor;

const metronomPreset: MetronomePreset = {
    tempo: 100,
};

beforeEach(() => {
    mpi = new MetronomePresetInteractor(metronomPreset);
});

it('should update values', () => {
    const tempo: Partial<MetronomePreset> = {
        tempo: 120,
    };

    const metronomPresetTempo = mpi.update(tempo);

    expect(metronomPresetTempo).toEqual({ ...metronomPreset, tempo: 120 });
});
