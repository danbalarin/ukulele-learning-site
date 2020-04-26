import React, { ReactElement } from 'react';
import DataTableComponent, {
    IDataTableColumn,
    createTheme,
} from 'react-data-table-component';
import customTheme from '../../theme';
import { useColorMode } from '../../';

const initTheme = (theme: string) =>
    createTheme(theme, {
        text: {
            primary: customTheme.modes?.[theme].color,
            secondary: customTheme.modes?.[theme].primary,
        },
        background: {
            default: 'transparent',
        },
        divider: {
            default: customTheme.modes?.[theme].background,
        },
        button: {
            default: customTheme.modes?.[theme].primary,
            hover: customTheme.modes?.[theme].primary,
        },
    });

initTheme('dark');
initTheme('light');

export type DataTableColumn<T> = IDataTableColumn<T>;

interface DataTableProps<T> {
    /**
     * Table title
     */
    title?: string;

    /**
     * Data to be displayed
     */
    data: T[];

    /**
     * Column definition
     */
    columns: DataTableColumn<T>[];

    /**
     * Loading flag
     */
    loading?: boolean;

    /**
     * Component to be shown as loading
     */
    loadingComponent?: React.ReactNode;
}

function DataTable<T = any>({
    loading,
    loadingComponent,
    ...props
}: DataTableProps<T>): ReactElement {
    const { colorMode } = useColorMode();
    return (
        <DataTableComponent
            {...props}
            theme={colorMode}
            progressPending={loading}
            progressComponent={loadingComponent}
        />
    );
}

export default DataTable;
