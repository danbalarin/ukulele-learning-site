import React, { ReactElement } from 'react';
import styled from '@emotion/styled';
import { useApolloClient } from '@apollo/client';

import {
    DataTable,
    Editable,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useToast,
    ComponentWrapper,
} from '@uls/look-react';
import { useUserMany } from '@uls/user-react';
import { Role } from '@uls/auth-common';
import { User } from '@uls/user-common';
import {
    USER_UPDATE_BY_ID,
    USER_UPDATE_BY_ID_RETURN,
    USER_UPDATE_BY_ID_VARIABLES,
} from '@uls/user-react';

interface Props {}

function AdminUsersPage({}: Props): ReactElement {
    type RowData = User & { _id: string };
    const { data, loading, refetch } = useUserMany({});
    const client = useApolloClient();
    const toast = useToast();

    const Wrapper = styled.div`
        width: 100%;
        height: 100%;
        padding: 16px;
    `;

    const createUpdate = (
        fieldname: string,
        id: string,
        origValue: any
    ) => async (value: any) => {
        if (origValue === value) {
            return;
        }
        const res = await client.mutate<
            USER_UPDATE_BY_ID_RETURN,
            USER_UPDATE_BY_ID_VARIABLES
        >({
            mutation: USER_UPDATE_BY_ID,
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
            name: 'Username',
            selector: 'username',
            sortable: true,
            cell: (row: RowData) => (
                <Editable
                    value={row.username}
                    onSubmit={createUpdate('username', row._id, row.username)}
                />
            ),
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true,
            cell: (row: RowData) => (
                <Editable
                    value={row.email}
                    onSubmit={createUpdate('email', row._id, row.email)}
                />
            ),
        },
        {
            name: 'Role',
            selector: 'role',
            sortable: true,
            cell: (row: RowData) => (
                <Menu>
                    <MenuButton>{Role[row.role]}</MenuButton>
                    <MenuList>
                        {Object.values(Role)
                            .filter(key => typeof key !== 'string')
                            .map(key => (
                                <MenuItem
                                    onClick={() =>
                                        createUpdate(
                                            'role',
                                            row._id,
                                            row.role
                                        )(key)
                                    }
                                    key={row.username + key}
                                >
                                    {Role[key as Role]}
                                </MenuItem>
                            ))}
                    </MenuList>
                </Menu>
            ),
        },
    ];

    return (
        <Wrapper>
            <ComponentWrapper width="100%" title="Users table">
                {!!data && (
                    <DataTable
                        data={data.userMany}
                        columns={columns}
                        loading={loading}
                    />
                )}
            </ComponentWrapper>
        </Wrapper>
    );
}

export default AdminUsersPage;
