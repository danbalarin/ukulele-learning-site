import React, { ReactElement } from 'react';
import { RouteComponentProps } from 'react-router';
import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';

import { Heading, Theme, SearchGroup } from '@uls/look-react';
import { Song, Author, Chord } from '@uls/ukulele-common';
import { User } from '@uls/user-common';

import {
    SEARCH_QUERY,
    SEARCH_QUERY_RESULT,
    SEARCH_QUERY_VARIABLES,
} from '../../graphql/search';
import { Error } from '../../components/Error';
import { Loading } from '../../components/Loading';
import SearchResultGroup from './SearchResultGroup';
import {
    transformSearchResult,
    WithID,
    CommonSearchOption,
} from '../../components/Search/searchUtils';

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

    let transformed: SearchGroup[] = [];

    if (data) {
        transformed = transformSearchResult(data, searchResultMapping);
    }

    return (
        <Wrapper>
            <Heading size="md">{`Searched term: ${search}`}</Heading>
            {loading ? (
                <Loading />
            ) : (
                transformed?.map(group => (
                    <SearchResultGroup
                        key={group.label}
                        title={group.label}
                        results={group.options}
                    />
                ))
            )}
        </Wrapper>
    );
}

type SearchPageResult = CommonSearchOption & { description?: string };

const searchResultMapping = {
    Song: (song: Song<any> & WithID): SearchPageResult => ({
        label: song.title,
        value: song._id,
        description: `by ${song.author?.name}`,
    }),
    User: (user: User & WithID): SearchPageResult => ({
        label: user.username,
        value: user._id,
    }),
    Author: (author: Author & WithID): SearchPageResult => ({
        label: author.name,
        value: author._id,
    }),
    Chord: (chord: Chord): SearchPageResult => ({
        label: chord.name,
        value: chord.name,
    }),
};

export default SearchPage;
