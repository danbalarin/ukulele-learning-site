import React, { ReactElement } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Theme, useColorMode, Heading } from '@uls/look-react';

interface SearchResultProps {
    label: string;
    value: string;
    description?: string;
}

function SearchResult({
    label,
    description,
    value,
}: SearchResultProps): ReactElement {
    const { colorMode } = useColorMode();
    const Wrapper = styled(Link)`
        :hover {
            background-color: rgba(0, 0, 0, 0.2);
        }
        border-left: 2px solid ${Theme.modes?.[colorMode]?.color};
        width: 100%;
        padding: 10px;
        margin: 2px 5px;
    `;
    const Title = styled.div`
        font-weight: ${Theme.fontWeights.bold};
        font-size: ${Theme.fontSizes.md};
    `;

    const Description = styled.div`
        font-weight: ${Theme.fontWeights.normal};
        font-size: ${Theme.fontSizes.sm};
        opacity: 0.95;
    `;

    return (
        <Wrapper to={value}>
            <Title>{label}</Title>
            {description ? <Description>{description}</Description> : <></>}
        </Wrapper>
    );
}

interface SearchResultGroupProps {
    title: string;
    results: SearchResultProps[];
}

function SearchResultGroup({
    title,
    results,
}: SearchResultGroupProps): ReactElement {
    const Wrapper = styled.div`
        width: ${Theme.breakpoints[0]};
    `;
    const ResultWrapper = styled.div`
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        flex-wrap: wrap;
        flex-flow: row wrap;
        align-content: flex-end;
    `;

    return (
        <Wrapper>
            <Heading size="lg">{title}</Heading>
            <ResultWrapper>
                {results.map((result, i) => (
                    <SearchResult
                        {...result}
                        key={result.label + i}
                    ></SearchResult>
                ))}
            </ResultWrapper>
        </Wrapper>
    );
}

export default SearchResultGroup;
