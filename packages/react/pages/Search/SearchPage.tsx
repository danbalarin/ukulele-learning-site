import React, { ReactElement } from 'react';
import { RouteComponentProps } from 'react-router';
import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';

import { Heading, Theme } from '@uls/look-react';
import {
    SEARCH_QUERY,
    SEARCH_QUERY_RESULT,
    SEARCH_QUERY_VARIABLES,
} from '../../graphql/search';
import { Error } from '../../components/Error';
import { Loading } from '../../components/Loading';

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

    if (!search) {
        return <Error title="500" subtitle="Something went wrong" />;
    }

    const { data, loading, error } = useQuery<
        SEARCH_QUERY_RESULT,
        SEARCH_QUERY_VARIABLES
    >(SEARCH_QUERY, { variables: { query: search } });
    return (
        <Wrapper>
            <Heading size="xl">{`Searched term: ${search}`}</Heading>
            <div>
                {loading ? <Loading /> : data?.search.map(group => group.label)}
            </div>
        </Wrapper>
    );
}

export default SearchPage;
