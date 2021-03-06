import React, {
    ReactElement,
    useEffect,
    useImperativeHandle,
    forwardRef,
} from 'react';
import { useApolloClient } from '@apollo/client';

import {
    DataTable,
    Editable,
    useToast,
    AsyncSelect,
    Button,
    Icon,
} from '@uls/look-react';
import { Author } from '@uls/ukulele-common';
import {
    useAuthorMany,
    useAuthorRemoveById,
    AUTHOR_UPDATE_BY_ID_RETURN,
    AUTHOR_UPDATE_BY_ID_VARIABLES,
    AUTHOR_UPDATE_BY_ID,
} from '@uls/ukulele-react';

interface Props {}

function AuthorTable({}: Props, ref: React.Ref<any>): ReactElement {
    const {
        data: authorsData,
        loading: authorsLoading,
        refetch,
    } = useAuthorMany({});
    const [
        removeById,
        { data: removeData, loading: removeLoading },
    ] = useAuthorRemoveById();
    const client = useApolloClient();
    const toast = useToast();

    useImperativeHandle(ref, () => ({
        refetch,
    }));

    useEffect(() => {
        refetch();
    }, [removeData]);

    const createUpdate = (
        fieldname: string,
        id: string,
        origValue: any
    ) => async (value: any) => {
        if (origValue === value) {
            return;
        }
        const res = await client.mutate<
            AUTHOR_UPDATE_BY_ID_RETURN,
            AUTHOR_UPDATE_BY_ID_VARIABLES
        >({
            mutation: AUTHOR_UPDATE_BY_ID,
            variables: { record: { _id: id, [fieldname]: value } },
        });
        if (!res.errors) {
            toast({
                title: 'Saved',
                description: `${fieldname[0].toLocaleUpperCase()}${fieldname.substr(
                    1
                )} was saved on ${id}.`,
                status: 'success',
                isClosable: true,
                duration: 5000,
            });
        }
        refetch();
    };

    const columns = [
        {
            name: 'ID',
            selector: '_id',
        },
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
            cell: (row: Author & { _id: string }) => (
                <Editable
                    key={`name ${row.name}`}
                    value={row.name}
                    onSubmit={createUpdate('name', row._id || '', row.name)}
                />
            ),
        },
        {
            name: 'Members',
            selector: 'members',
            sortable: true,
            cell: (row: Author & { _id: string }) => (
                <AsyncSelect
                    key={`author select ${row._id} ${row.name}`}
                    keyName={`author ${row._id} ${row.name}`}
                    onChange={() => {}}
                    loadOptions={async (): Promise<any[]> => []}
                    multi={true}
                    // @ts-ignore-line
                    value={row.members?.map(mem => ({
                        label: mem.name,
                        value: {
                            ...mem,
                            toString: () => `${mem.name}`,
                        },
                    }))}
                    disabled={true}
                />
            ),
        },
        {
            name: 'Del',
            grow: 0,
            cell: (row: Author & { _id: string }) => (
                <Button
                    variantColor="red"
                    onClick={() =>
                        row._id && removeById({ variables: { _id: row._id } })
                    }
                >
                    <Icon name="times" />
                </Button>
            ),
        },
    ];

    return (
        <>
            {!!authorsData && (
                <DataTable
                    columns={columns}
                    data={authorsData.authorMany}
                    loading={authorsLoading || removeLoading}
                />
            )}
        </>
    );
}

export default forwardRef(AuthorTable);
