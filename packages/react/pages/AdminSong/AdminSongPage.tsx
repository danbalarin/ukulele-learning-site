import React, { ReactElement } from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';

import { ComponentWrapper, Button, Icon } from '@uls/look-react';

import SongTable from './SongTable';

interface Props {}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    & > * {
        margin-top: 16px;
    }
`;

function AdminSongPage({}: Props): ReactElement {
    const { push } = useHistory();

    return (
        <Wrapper>
            <Button
                onClick={() => push('/song/new')}
                variant="solid"
                variantColor="green"
            >
                <Icon name="plus" size="sm" />
            </Button>
            <ComponentWrapper title="Song list" width="100%">
                <SongTable />
            </ComponentWrapper>
        </Wrapper>
    );
}

export default AdminSongPage;
