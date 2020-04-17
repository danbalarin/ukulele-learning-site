import { SEARCH_QUERY_RESULT, SearchUnionType } from '../../graphql/search';

export interface CommonSearchOption {
    label: string;
    value: string;
}

export interface TransformedSearchGroup<T = CommonSearchOption> {
    label: string;
    options: T[];
}

export type WithID = { _id: string };

const searchGroupTranslate = {
    User: { label: 'Users', path: '/user/' },
    Song: { label: 'Songs', path: '/song/' },
    Author: {
        label: 'Authors',
        path: '/author/',
    },
    Chord: {
        label: 'Chords',
        path: '/chord/',
    },
};

const transformedSearchGroupOrders: any = {
    Users: 3,
    Songs: 0,
    Authors: 1,
    Chords: 2,
};

export function transformSearchResult<T extends CommonSearchOption>(
    data: SEARCH_QUERY_RESULT,
    searchOptionTransformers: {
        [key in SearchGroupMappingKeys]: (val: any) => T;
    }
): TransformedSearchGroup<T>[] {
    // divides into groups
    const map = new Map<string, SearchUnionType[]>();
    data.search.forEach(val => {
        const collection = map.get(val.__typename);
        if (!collection) {
            map.set(val.__typename, [val]);
        } else {
            collection.push(val);
        }
    });

    // tranform groups
    const arrayMap: TransformedSearchGroup<T>[] = [];
    for (const key of map.keys()) {
        const entry = map.get(key);
        entry &&
            arrayMap.push(
                searchGroupTransformer<T>(
                    entry,
                    key as SearchGroupMappingKeys,
                    searchOptionTransformers
                )
            );
    }

    arrayMap.sort(searchGroupSorter);

    return arrayMap;
}

type SearchGroupMappingKeys = 'User' | 'Song' | 'Author' | 'Chord';

function searchGroupSorter<T>(
    a: TransformedSearchGroup<T>,
    b: TransformedSearchGroup<T>
) {
    return (
        transformedSearchGroupOrders[a.label] -
        transformedSearchGroupOrders[b.label]
    );
}
function searchGroupTransformer<T extends CommonSearchOption>(
    values: SearchUnionType[],
    key: SearchGroupMappingKeys,
    searchOptionTransformer: {
        [key in SearchGroupMappingKeys]: (val: any) => T;
    }
): TransformedSearchGroup<T> {
    return {
        label: searchGroupTranslate[key].label,
        options: values.map(value => {
            const transformed = searchOptionTransformer[key](value);
            transformed.value = `${searchGroupTranslate[key].path}${transformed.value}`;
            return transformed;
        }),
    };
}
