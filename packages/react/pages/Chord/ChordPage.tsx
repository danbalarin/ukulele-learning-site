import React, { ReactElement } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from '@emotion/styled';

import { Chord, useChordByName } from '@uls/ukulele-react';
import { ComponentWrapper } from '@uls/look-react';

import { Loading } from '../../components/Loading';
import { Error } from '../../components/Error';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface Props extends RouteComponentProps<{ name: string }> {}

function ChordPage({
    match: {
        params: { name },
    },
}: Props): ReactElement {
    if (!name) {
        return <Error title="500" subtitle="Something went wrong" />;
    }

    const { data, loading, error } = useChordByName({
        variables: { name: name },
    });

    return (
        <Wrapper>
            {loading ? (
                <Loading />
            ) : data?.chordOne ? (
                <ComponentWrapper title={`Chord ${data.chordOne.name}`}>
                    <Chord chord={data.chordOne} />
                </ComponentWrapper>
            ) : (
                <Error title="500" subtitle="Something went wrong" />
            )}
        </Wrapper>
    );
}

export default ChordPage;
