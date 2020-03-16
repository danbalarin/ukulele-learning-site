import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import LoginForm from './LoginForm';

interface Props {
    children: React.ReactNode;
}

const Wrapper = (props: Props) => {
    const boxWidth = number('Box width', 350, {
        range: true,
        min: 100,
        max: 1000,
        step: 1,
    });

    return (
        <div
            {...props}
            style={{
                width: `${boxWidth}px`,
                padding: '10px',
                border: '1px solid black',
                borderRadius: '10px',
            }}
        />
    );
};

storiesOf('User/Login form', module)
    .addDecorator(withKnobs)
    .add('Basic', () => (
        <Wrapper>
            <LoginForm
                onLogin={action('form-login')}
                isLoading={boolean('Form loading', false)}
            />
        </Wrapper>
    ));
