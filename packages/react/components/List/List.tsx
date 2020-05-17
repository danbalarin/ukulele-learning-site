import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

import { Heading, Theme } from '@uls/look-react';

import ListItem, { ListItemProps } from './ListItem';

interface ListProps {
    /**
     * List heading
     */
    title: React.ReactNode;

    /**
     * List items
     */
    items: ListItemProps[];

    /**
     * Number of item columns
     */
    columns?: number;
}

function List({ title, items, columns }: ListProps): ReactElement {
    const Wrapper = styled.div`
        width: ${Theme.breakpoints[0]};
    `;
    const ResultWrapper = styled.div`
        width: 100%;
        display: grid;
        grid-template-columns: ${`repeat(${columns || 1}, 1fr)`};
    `;

    return (
        <Wrapper>
            <Heading size="lg">{title}</Heading>
            <ResultWrapper>
                {items.map((item, i) => (
                    <ListItem {...item} key={item.label + i}></ListItem>
                ))}
            </ResultWrapper>
        </Wrapper>
    );
}

export default List;
