import configChecker from './src/utils/configCheck';
import { Seeder } from './src/utils/Seeder';
import { Logger, LoggerLevel } from './src/utils/Logger';

import { UserSeed } from './modules/user';

(async function() {
    const logger = new Logger(LoggerLevel.Info);

    configChecker(logger).check();

    const seeder = new Seeder(logger);

    await seeder.seed(UserSeed, true);

    seeder.cleanup();
})();
