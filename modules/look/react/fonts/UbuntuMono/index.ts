import { css } from 'styled-components';

import ubuntuBold from './UbuntuMono-Bold.ttf';
import ubuntuMedium from './UbuntuMono-Regular.ttf';

export default css`
    @font-face {
        font-family: 'UbuntuMono';
        src: url(${ubuntuBold}) format('truetype');
        font-weight: bold;
        font-style: normal;
    }

    @font-face {
        font-family: 'UbuntuMono';
        src: url(${ubuntuMedium}) format('truetype');
        font-weight: normal;
        font-style: normal;
    }
`;
