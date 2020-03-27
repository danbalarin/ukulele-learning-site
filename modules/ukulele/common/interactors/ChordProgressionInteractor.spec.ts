import { ChordProgressionInteractor } from './ChordProgressionInteractor';
import { ChordProgression } from '../entities/ChordProgression';
import { Chord } from '../entities/Chords';
import { Tone } from '../entities/Tone';

type T = number;

let cpi: ChordProgressionInteractor<T>;

const cChord: Chord = {
    name: 'C',
    strings: [Tone.C, Tone.E, Tone.C, Tone.G],
};

const chordProgression: ChordProgression<T> = {
    name: 'test',
    chords: [cChord],
    creator: 1, // user id simulation
};

beforeEach(() => {
    cpi = new ChordProgressionInteractor(chordProgression);
});

it('should update values', () => {
    const name: Partial<ChordProgression<T>> = {
        name: 'New Name',
    };

    const chords: Partial<ChordProgression<T>> = {
        chords: [],
    };

    const creator: Partial<ChordProgression<T>> = {
        creator: 9,
    };

    const chordProgressionName = cpi.update(name);
    const chordProgressionChords = cpi.update(chords);
    const chordProgressionCreator = cpi.update(creator);

    expect(chordProgressionName).toEqual({
        ...chordProgression,
        name: 'New Name',
    });
    expect(chordProgressionChords).toEqual({ ...chordProgression, chords: [] });
    expect(chordProgressionCreator).toEqual({
        ...chordProgression,
        creator: 9,
    });
});
