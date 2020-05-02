import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';

import DataTable from './DataTable';

const columns = [
    { name: 'ID', selector: 'id' },
    { name: 'Name', selector: 'name', sortable: true },
];

const data = [
    { id: 0, name: 'Sample text' },
    { id: 1, name: 'Harambe is dead' },
    { id: 2, name: 'Lorem ipsum' },
];

storiesOf('Look/DataTable', module)
    .addDecorator(withKnobs)
    .add('Basic', () => {
        const loading = boolean('Loading', false);
        const title = text('Title', 'Sample title');
        return (
            <DataTable
                title={title}
                loading={loading}
                columns={columns}
                data={data}
            />
        );
    })
    .add('Custom loading', () => {
        const loading = boolean('Loading', false);
        const title = text('Title', 'Sample title');
        return (
            <DataTable
                title={title}
                loadingComponent={<span>Awesome loading..</span>}
                loading={loading}
                columns={columns}
                data={data}
            />
        );
    });
