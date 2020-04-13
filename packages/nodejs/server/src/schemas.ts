import { schemaComposer, Resolver } from 'graphql-compose';

import { SearchGroup, SearchOption } from '@uls/core-nodejs';

import { modules } from '../modules';

interface SearchQuery {
    resolver: Resolver;
}

const createSchema = () => {
    const searchQueries: SearchQuery[] = [];
    for (const module of modules) {
        for (const model of module.models) {
            schemaComposer.Mutation.addFields(model.mutation);
            schemaComposer.Query.addFields(model.query);
            model.searchQuery &&
                searchQueries.push({
                    resolver: model.searchQuery,
                });
        }
    }

    const SearchOptionTC = schemaComposer.createObjectTC(SearchOption);

    const SearchGroupTC = schemaComposer.createObjectTC(SearchGroup);

    SearchGroupTC.addResolver({
        kind: 'query',
        name: 'search',
        args: {
            query: 'String!',
        },
        type: [SearchGroupTC],
        resolve: async ({ source, args, context, info }: any) => {
            const result = await Promise.all(
                searchQueries.map(async ({ resolver }) => {
                    let group = undefined;
                    try {
                        group = await resolver.resolve({
                            source,
                            args,
                            context,
                            info,
                        });
                    } catch (err) {
                    } finally {
                        return group;
                    }
                })
            );
            return result.filter(val => !!val);
        },
    });

    schemaComposer.Query.addFields({
        search: SearchGroupTC.getResolver('search'),
    });

    return schemaComposer.buildSchema();
};

export default createSchema;
