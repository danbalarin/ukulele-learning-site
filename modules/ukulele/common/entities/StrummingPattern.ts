import { MetronomePreset } from './MetronomePreset';

/**
 * - D for Down
 * - U for Up
 * - T for Tap
 * - \- for pause
 */
export enum Strum {
    'D',
    'U',
    'T',
    '-',
}

export type Strums = keyof typeof Strum;

/**
 * Strumming pattern
 */
export interface StrummingPattern {
    /**
     * Strumming pattern
     */
    pattern: Strum[];

    /**
     * Strumming pattern metronome preset
     */
    metronomePreset?: MetronomePreset;
}
