import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

import { Theme } from '@uls/look-react';
import { useChordMany } from '@uls/ukulele-react';
import { Loading } from '../../components/Loading';
import { List } from '../../components/List';
import { Error } from '../../components/Error';

const Wrapper = styled.div`
    @media (min-width: ${Theme.breakpoints[0]}) {
        padding-top: 1em;
    }
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

interface Props {}

function ChordListPage({}: Props): ReactElement {
    const { data, loading, error } = useChordMany({});
    if (loading) {
        return <Wrapper children={<Loading />} />;
    }
    if (error || !data) {
        return (
            <Error
                title={error?.name || 'No data'}
                subtitle={
                    error?.message || 'Chords cannot be fetched right now.'
                }
            />
        );
    }
    return (
        <Wrapper>
            <List
                title="Chords"
                items={data.chordMany.map(chord => ({
                    label: chord.name,
                    linkTo: `/chord/${chord.name}`,
                }))}
                columns={3}
            />
        </Wrapper>
    );
}

export default ChordListPage;
