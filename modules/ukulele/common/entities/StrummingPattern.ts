import { MetronomePreset } from './MetronomePreset';

/**
 * D for Down
 * U for Up
 * T for Tap
 * - for pause
 */
export type Strum = 'D' | 'U' | 'T' | '-';

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
