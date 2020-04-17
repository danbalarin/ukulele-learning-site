import { schemaComposer, Resolver, ObjectTypeComposer } from 'graphql-compose';
import gql from 'graphql';

import { modules } from '../modules';

const createSchema = () => {
    const searchResolvers: Resolver[] = [];
    const searchTypes: ObjectTypeComposer[] = [];
    for (const module of modules) {
        for (const model of module.models) {
            schemaComposer.Mutation.addFields(model.mutation);
            schemaComposer.Query.addFields(model.query);
            if (!!model.searchQuery) {
                searchResolvers.push(model.searchQuery);
                searchTypes.push(model.typeComposer);
            }
        }
    }

    const SearchResultTC = schemaComposer.createUnionTC({
        name: 'SearchResult',
        types: searchTypes,
    });

    const searchResolver = schemaComposer.createResolver({
        kind: 'query',
        name: 'search',
        type: [SearchResultTC],
        args: {
            query: 'String!',
        },
        resolve: async ({ source, args, context, info }: any) => {
            const searchResults = await Promise.all(
                searchResolvers.map(async resolver => {
                    try {
                        const results = await resolver.resolve({
                            source,
                            args,
                            context,
                            info,
                        });
                        results;
                        return results;
                    } catch (err) {
                        return [];
                    }
                })
            );
            return searchResults.flat();
        },
    });

    schemaComposer.Query.addFields({
        search: searchResolver,
    });

    return schemaComposer.buildSchema();
};

export default createSchema;
