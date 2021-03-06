import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { Heading, Button, Theme } from '@uls/look-react';

import { Search } from '../../components/Search';

interface Props {}

function HomePage({}: Props): ReactElement {
    const Wrapper = styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        & > * {
            margin: 10px;
        }
    `;

    const ButtonBox = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        & > * {
            margin: 10px;
        }
    `;

    const SearchBox = styled.div`
        @media (min-width: ${Theme.breakpoints[1]}) {
            padding: 2em;
            padding-top: 0;
        }
        width: 100%;
    `;

    return (
        <Wrapper>
            <Heading size="lg">Welcome, try searching in the box below</Heading>
            <SearchBox>
                <Search keyName="homepage search" />
            </SearchBox>
            <Heading size="md">or try one of these categories</Heading>
            <ButtonBox>
                <Link to="/songs">
                    <Button variantColor="blue" variant="solid">
                        Songs
                    </Button>
                </Link>
                <Link to="/chords">
                    <Button variantColor="green" variant="solid">
                        Chords
                    </Button>
                </Link>
            </ButtonBox>
        </Wrapper>
    );
}

export default HomePage;
