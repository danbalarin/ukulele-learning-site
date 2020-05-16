import { ServerModuleOptions, ServerModuleModel } from '@uls/core-nodejs';

import { createChordSchema } from './models/chordSchema';
import { createChordSeed } from './seeds/chordSeed';

import { createMetronomePresetSchema } from './models/metronomePresetSchema';
import { createMetronomePresetSeed } from './seeds/metronomePresetSeed';

import { createStrummingPatternSchema } from './models/strummingPatternSchema';
import { createStrummingPatternSeed } from './seeds/strummingPatternSeed';

import { createChordProgressionSchema } from './models/chordProgressionSchema';
import { createChordProgressionSeed } from './seeds/chordProgressionSeed';

import { createAuthorSchema } from './models/authorSchema';
import { createAuthorSeed } from './seeds/authorSeed';
import { createSongSchema } from './models/songSchema';
import { createSongSeed } from './seeds/songSeed';

export const createModels = (
    options: ServerModuleOptions
): ServerModuleModel[] => {
    const chordModel = createChordSchema(options);
    const chordSeed = createChordSeed(options);
    const chord = { ...chordModel, ...chordSeed };

    const metronomePresetModel = createMetronomePresetSchema(options);
    const metronomePresetSeed = createMetronomePresetSeed(options);
    const metronomePreset = { ...metronomePresetModel, ...metronomePresetSeed };

    const strummingPatternModel = createStrummingPatternSchema(options, {
        MetronomePresetTC: metronomePreset.typeComposer,
    });
    const strummingPatternSeed = createStrummingPatternSeed(options);
    const strummingPattern = {
        ...strummingPatternModel,
        ...strummingPatternSeed,
    };

    const chordProgressionModel = createChordProgressionSchema(options);
    const chordProgressionSeed = createChordProgressionSeed(options);
    const chordProgression = {
        ...chordProgressionModel,
        ...chordProgressionSeed,
    };

    const authorModel = createAuthorSchema(options);
    const authorSeed = createAuthorSeed(options);
    const author = {
        ...authorModel,
        ...authorSeed,
    };

    const songModel = createSongSchema(options, {
        ChordTC: chordModel.typeComposer,
        AuthorTC: authorModel.typeComposer,
        StrummingPatternTC: strummingPattern.typeComposer,
        MetronomePresetTC: metronomePreset.typeComposer,
    });
    const songSeed = createSongSeed(options);
    const song = {
        ...songModel,
        ...songSeed,
    };

    return [
        chord,
        metronomePreset,
        strummingPattern,
        chordProgression,
        author,
        song,
    ];
};
