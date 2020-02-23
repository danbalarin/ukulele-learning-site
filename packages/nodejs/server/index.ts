import { ApolloServer } from 'apollo-server';

import { UserSchema } from './schemas';

import connection from './database';

connection
    .then((db: any) => db)
    .catch((err: any) => {
        console.log(err);
    });

const PORT = 4000; // after changing this you need to update NODEJS_PORT in other packages

const server = new ApolloServer({ schema: UserSchema });

server.listen({ port: PORT }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
