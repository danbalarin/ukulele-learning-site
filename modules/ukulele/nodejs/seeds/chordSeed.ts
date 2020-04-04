import { ServerModuleOptions, ServerModuleModel } from '@uls/core-nodejs';

import { Chord, Tone } from '@uls/ukulele-common';

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
    ];

    const chordsC: Chord[] = [
        {
            name: 'C',
            strings: [G, C, E, C],
        },
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
    ];

    const chordsF: Chord[] = [
        {
            name: 'F',
            strings: [A, C, F, A],
        },
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
            strings: [G, D, Gb, B],
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
