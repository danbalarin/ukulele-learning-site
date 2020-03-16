import server from './apollo';

server.listen({ port: process?.env?.PORT }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
