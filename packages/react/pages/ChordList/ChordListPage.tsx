import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

import { Theme, Heading } from '@uls/look-react';
import { useChordMany } from '@uls/ukulele-react';
import { Loading } from '../../components/Loading';
import { List } from '../../components/List';
import { Error } from '../../components/Error';
import { ChordType, Chord } from '../../../../modules/ukulele/common';

const Wrapper = styled.div`
    @media (min-width: ${Theme.breakpoints[0]}) {
        padding-top: 1em;
    }
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

const GROUP_LABELS = {
    [ChordType.Major]: 'Major',
    [ChordType.Minor]: 'Minor',
    [ChordType.MajorSeventh]: 'Major Seventh',
    [ChordType.MinorSeventh]: 'Minor Seventh',
    [ChordType.DimishedSeventh]: 'Dimished Seventh',
    [ChordType.DominantSeventh]: 'Dominant Seventh',
};

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

    const groups: {
        [key: number]: {
            label: string;
            chords: { label: string; linkTo: string }[];
        };
    } = {};
    data.chordMany.forEach(chord => {
        const transformChord = (chord: Chord) => ({
            label: chord.name,
            linkTo: `/chord/${chord.name}`,
        });

        const type = chord.type || ChordType.Major;
        let group = groups[type];
        if (!group) {
            group = {
                label: GROUP_LABELS[type],
                chords: [transformChord(chord)],
            };
            groups[type] = group;
        } else {
            group.chords.push(transformChord(chord));
        }
    });

    return (
        <Wrapper>
            <Heading>Chords</Heading>
            {Object.values(groups).map(group => (
                <List title={group.label} items={group.chords} columns={3} />
            ))}
        </Wrapper>
    );
}

export default ChordListPage;
