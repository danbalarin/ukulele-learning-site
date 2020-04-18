import React, { ReactElement } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from '@emotion/styled';

import { Chord, useChordByName } from '@uls/ukulele-react';
import { Loading } from '../../components/Loading';
import { Error } from '../../components/Error';
import { ComponentWrapper } from '../../../../.yarn/$$virtual/@uls-look-react-virtual-f6a7a69315/1/modules/look/react';

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
