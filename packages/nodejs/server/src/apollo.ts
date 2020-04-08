import {
    ApolloServer,
    UserInputError,
    AuthenticationError,
} from 'apollo-server';
import jwt from 'jsonwebtoken';

import createSchema from './schemas';
import createConnection from './database';
import { Logger } from './utils/Logger';

export default (logger: Logger) => {
    createConnection()
        .then((db: any) => db)
        .catch(logger.error);

    return new ApolloServer({
        schema: createSchema(),
        debug: process.env?.NODE_ENV !== 'production',
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
                const user = jwt.verify(
                    token,
                    process?.env?.JWT_SECRET as string
                );
                if (token !== '' && !user) {
                    throw new AuthenticationError(
                        'Token is expired, please re-login.'
                    );
                }
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
            if (err.extensions?.exception?.code === 11000) {
                return new UserInputError('Duplicate key error', {
                    invalidArgs: err.extensions?.exception?.keyValue,
                });
            }
            if (err.extensions?.code?.includes('INTERNAL_SERVER_ERROR')) {
                logger.error('Unknown error occured:');
                logger.error(err);
                return new Error('Internal server error');
            }
            return err;
        },
    });
};
