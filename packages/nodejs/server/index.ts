import configChecker from './src/utils/configCheck';

import createServer from './src/apollo';
import { Logger, LoggerLevel } from './src/utils/Logger';

(async function() {
    const logger = new Logger(LoggerLevel.Info);

    configChecker(logger).check();

    createServer(logger)
        .listen({ port: process?.env?.PORT })
        .then(({ url }) => {
            logger.success(`Server ready at ${url}`);
        });
})();
