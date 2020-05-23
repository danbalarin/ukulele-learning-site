import { ServerModuleOptions, ServerModuleModel } from '@uls/core-nodejs';

import { Chord, Tone, ChordType } from '@uls/ukulele-common';

/** just to shorten the code */
const C = Tone.C;
const Db = Tone.Db;
const D = Tone.D;
const Eb = Tone.Eb;
const E = Tone.E;
const F = Tone.F;
const Gb = Tone.Gb;
const G = Tone.G;
const Ab = Tone.Ab;
const A = Tone.A;
const Hb = Tone.Hb;
const B = Tone.B;
const H = Tone.H;
const Cb = Tone.Cb;

/**
 * Creates every possible {@link Chord}
 *
 * @param options
 */
export const createChordSeed = (
    options: ServerModuleOptions
): Pick<ServerModuleModel, 'seed'> => {
    const chordsA: Chord[] = [
        {
            name: 'A',
            strings: [A, Db, E, A],
        },
        { name: 'Am', strings: [A, C, E, A], type: ChordType.Minor },
        { name: 'A7', strings: [G, Db, E, A], type: ChordType.MajorSeventh },
    ];

    const chordsBb: Chord[] = [
        {
            name: 'Bb',
            strings: [B, D, F, B],
        },
    ];

    const chordsB: Chord[] = [
        {
            name: 'B',
            strings: [H, Eb, Gb, H],
        },
        { name: 'Bm', strings: [H, D, Gb, H], type: ChordType.Minor },
        { name: 'B7', strings: [A, Eb, Gb, H], type: ChordType.MajorSeventh },
    ];

    const chordsC: Chord[] = [
        {
            name: 'C',
            strings: [G, C, E, C],
        },
        { name: 'Cm', strings: [G, Eb, G, C], type: ChordType.Minor },
        { name: 'C7', strings: [G, C, E, B], type: ChordType.MajorSeventh },
    ];

    const chordsDb: Chord[] = [
        {
            name: 'Db',
            strings: [Ab, Db, F, Db],
        },
    ];

    const chordsD: Chord[] = [
        {
            name: 'D',
            strings: [A, D, Gb, A],
        },
        { name: 'Dm', strings: [A, D, F, A], type: ChordType.Minor },
        { name: 'D7', strings: [A, D, Gb, C], type: ChordType.MajorSeventh },
    ];

    const chordsEb: Chord[] = [
        {
            name: 'Eb',
            strings: [G, Eb, G, B],
        },
    ];

    const chordsE: Chord[] = [
        {
            name: 'E',
            strings: [Ab, E, E, Cb],
        },
        { name: 'Em', strings: [G, E, G, H], type: ChordType.Minor },
        {
            name: 'E7',
            strings: [Ab, D, E, A + 2],
            type: ChordType.MajorSeventh,
        },
    ];

    const chordsF: Chord[] = [
        {
            name: 'F',
            strings: [A, C, F, A],
        },
        { name: 'Fm', strings: [Ab, C, F, C], type: ChordType.Minor },
        { name: 'F7', strings: [A, Eb, F, C], type: ChordType.MajorSeventh },
    ];

    const chordsGb: Chord[] = [
        {
            name: 'Gb',
            strings: [B, Db, Gb, B],
        },
    ];

    const chordsG: Chord[] = [
        {
            name: 'G',
            strings: [G, D, G, H],
        },
        { name: 'Gm', strings: [G, D, G, B], type: ChordType.Minor },
        {
            name: 'G7',
            strings: [G, D, F, H],
            type: ChordType.MajorSeventh,
        },
    ];

    const chordsAb: Chord[] = [
        {
            name: 'Ab',
            strings: [Ab, Eb, Ab, Cb],
        },
    ];

    const chords: Chord[] = [
        ...chordsA,
        ...chordsBb,
        ...chordsB,
        ...chordsC,
        ...chordsDb,
        ...chordsD,
        ...chordsEb,
        ...chordsE,
        ...chordsF,
        ...chordsGb,
        ...chordsG,
        ...chordsAb,
    ];

    return { seed: chords };
};
