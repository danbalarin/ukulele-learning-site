import gql from 'graphql-tag';

import { StrummingPattern } from '@uls/ukulele-common';

export const STRUMMING_PATTERN_FRAGMENT_NAME = 'StrummingPatternFragment';
export const STRUMMING_PATTERN_FRAGMENT = gql`
    fragment ${STRUMMING_PATTERN_FRAGMENT_NAME} on StrummingPattern {
        _id
        pattern
        metronomePreset {
            tempo
        }
    }
`;
