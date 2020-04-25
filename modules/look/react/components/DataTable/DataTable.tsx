import React, { ReactElement } from 'react';
import DataTableComponent, {
    IDataTableColumn,
} from 'react-data-table-component';

export type DataTableColumn<T> = IDataTableColumn<T>;

interface DataTableProps<T> {
    /**
     * Table title
     */
    title?: string;

    /**
     * Data to be displayed
     */
    data: T;

    /**
     * Column definition
     */
    columns: DataTableColumn<T>;
}

function DataTable<T = any>({ ...props }: DataTableProps<T>): ReactElement {
    return <DataTableComponent {...props} />;
}

export default DataTable;
