import { css } from '@emotion/core';

import gothamBold from './GothamRounded-Bold.otf';
import gothamMedium from './GothamRounded-Medium.otf';

export default css`
    @font-face {
        font-family: 'GothamRounded';
        src: url(${gothamBold}) format('truetype');
        font-weight: bold;
        font-style: normal;
    }

    @font-face {
        font-family: 'GothamRounded';
        src: url(${gothamMedium}) format('truetype');
        font-weight: normal;
        font-style: normal;
    }
`;
