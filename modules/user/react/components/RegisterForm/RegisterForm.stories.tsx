import React from 'react';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import RegisterForm from './RegisterForm';

export default {
    title: 'Register form',
    component: RegisterForm,
    decorators: [withKnobs],
};

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

export const basic = () => (
    <Wrapper>
        <RegisterForm
            onSubmit={action('form-submit')}
            isLoading={boolean('Form loading', false)}
        />
    </Wrapper>
);

export const withTermsAndConditions = () => (
    <Wrapper>
        <RegisterForm
            onSubmit={action('form-submit')}
            isLoading={boolean('Form loading', false)}
            termsAndConditionsElement={'Sample terms and conditions'}
        />
    </Wrapper>
);
