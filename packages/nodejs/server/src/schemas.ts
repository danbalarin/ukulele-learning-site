import { modules } from '../modules';

import { schemaComposer } from 'graphql-compose';

const createSchema = () => {
    for (const module of modules) {
        for (const model of module.models) {
            schemaComposer.Mutation.addFields(model.mutation);
            schemaComposer.Query.addFields(model.query);
        }
    }

    return schemaComposer.buildSchema();
};

export default createSchema;
