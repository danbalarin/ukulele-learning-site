import React, { ReactElement } from 'react';
import { RouteComponentProps } from 'react-router';
import styled from '@emotion/styled';

import { Heading, Theme } from '@uls/look-react';

interface Props extends RouteComponentProps {}

const Wrapper = styled.div`
    @media (min-width: ${Theme.breakpoints[0]}) {
        padding-top: 1em;
    }
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

function SearchPage({ ...props }: Props): ReactElement {
    const search = props.location.search.split('&')[0].split('=')[1];
    return (
        <Wrapper>
            <Heading size="xl">{`Searched term: ${search}`}</Heading>
            <div>results</div>
        </Wrapper>
    );
}

export default SearchPage;
