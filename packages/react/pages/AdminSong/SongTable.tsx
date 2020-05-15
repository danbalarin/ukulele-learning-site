import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

import { useSongMany } from '@uls/ukulele-react';
import { DataTable, Button, Icon } from '@uls/look-react';
import { Song } from '@uls/ukulele-common';

interface Props {}

function SongTable({}: Props): ReactElement {
    const { data: songData, loading: songLoading, refetch } = useSongMany({});
    const { push } = useHistory();

    const onClickRedirect = (id: string) => () => {
        push(`/song/${id}`);
    };

    const columns = [
        {
            name: 'ID',
            selector: '_id',
        },
        {
            name: 'Title',
            selector: 'title',
        },
        {
            name: 'Edit',
            grow: 0,
            cell: (row: Song<any> & { _id: string }) => (
                <Button
                    variantColor="orange"
                    onClick={onClickRedirect(row._id)}
                >
                    <Icon name="pen" />
                </Button>
            ),
        },
    ];

    return (
        <>
            {songData && (
                <DataTable
                    data={songData.songMany}
                    columns={columns}
                    loading={songLoading}
                />
            )}
        </>
    );
}

export default SongTable;
