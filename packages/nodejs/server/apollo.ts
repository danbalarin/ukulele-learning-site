import { ApolloServer } from 'apollo-server';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import schema from './schemas';
import connection from './database';

dotenv.config();

connection
    .then((db: any) => db)
    .catch((err: any) => {
        console.log(err);
    });

export default new ApolloServer({
    schema: schema,
    plugins: [
        {
            requestDidStart() {
                return {
                    didResolveOperation(requestContext) {
                        if (!!requestContext.context?.token) {
                            requestContext.response?.http?.headers.set(
                                'Authorization',
                                requestContext.context?.token
                            );
                        }
                    },
                };
            },
        },
    ],
    context: ({ req }) => {
        try {
            const token = req.headers.authorization || '';
            const user = jwt.verify(token, process?.env?.JWT_SECRET as string);
            return { user, token };
        } catch (e) {
            // console.log(e);
        }
    },
    cors: {
        credentials: true,
        origin: process?.env?.FRONTEND_URI as string,
    },
    formatError: err => {
        // if (err.extensions?.code?.includes('INTERNAL_SERVER_ERROR')) {
        //     return new Error('Internal server error');
        // }

        return err;
    },
});
