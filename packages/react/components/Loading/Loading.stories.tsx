import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from '@emotion/styled';

import Loading from './Loading';

storiesOf('Package/Loading', module).add('Basic loading', () => {
    return <Loading />;
});
