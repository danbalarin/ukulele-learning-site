import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

import { Heading, Icon, IconName } from '@uls/look-react';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

const ImageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TextWrapper = styled.div`
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`;

interface BaseProps {
    title: string;
    subtitle: string;
}

interface IconProps extends BaseProps {
    icon: IconName;
}

interface ImageProps extends BaseProps {
    image: string;
}

function Error(props: ImageProps | IconProps | BaseProps): ReactElement {
    const { title, subtitle } = props;
    let leftContent = <></>;
    if ((props as IconProps).icon) {
        leftContent = <Icon size="4x" name={(props as IconProps).icon} />;
    } else if ((props as ImageProps).image) {
        leftContent = <img src={(props as ImageProps).image} />;
    }
    return (
        <Wrapper>
            <ImageWrapper>{leftContent}</ImageWrapper>
            <TextWrapper>
                <Heading size="2xl">{title}</Heading>
                <Heading size="xl">{subtitle}</Heading>
            </TextWrapper>
        </Wrapper>
    );
}

export default Error;
