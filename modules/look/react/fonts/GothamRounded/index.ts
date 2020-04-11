import { css } from '@emotion/core';

import gothamBoldOTF from './GothamRounded-Bold.otf';
import gothamBoldSVG from './GothamRounded-Bold.svg';
import gothamBoldWOFF from './GothamRounded-Bold.woff';
import gothamBoldWOFF2 from './GothamRounded-Bold.woff2';

import gothamMediumOTF from './GothamRounded-Medium.otf';
import gothamMediumSVG from './GothamRounded-Medium.svg';
import gothamMediumWOFF from './GothamRounded-Medium.woff';
import gothamMediumWOFF2 from './GothamRounded-Medium.woff2';

export default css`
    @font-face {
        font-family: 'GothamRounded';
        src: url(${gothamBoldOTF}) format('opentype'),
            url(${gothamBoldSVG}) format('svg'),
            url(${gothamBoldWOFF}) format('woff'),
            url(${gothamBoldWOFF2}) format('woff2');
        font-weight: bold;
        font-style: normal;
    }

    @font-face {
        font-family: 'GothamRounded';
        src: url(${gothamMediumOTF}) format('opentype'),
            url(${gothamMediumSVG}) format('svg'),
            url(${gothamMediumWOFF}) format('woff'),
            url(${gothamMediumWOFF2}) format('woff2');
        font-weight: normal;
        font-style: normal;
    }
`;
