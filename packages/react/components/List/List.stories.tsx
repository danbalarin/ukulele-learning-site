import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import styled from '@emotion/styled';

import List from './List';

storiesOf('Package/List', module)
    .addDecorator(withKnobs)
    .add('Basic list', () => {
        const title = text('Title', 'List title');
        return (
            <List
                title={title}
                items={[
                    { label: 'List item one', linkTo: '#' },
                    { label: 'List item two', linkTo: '#' },
                    {
                        label: 'List item with description',
                        linkTo: '#',
                        description: 'Sample text',
                    },
                ]}
            />
        );
    });
