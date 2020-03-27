import configChecker from './src/utils/configCheck';
import { Seeder } from './src/utils/Seeder';
import { Logger, LoggerLevel } from './src/utils/Logger';

import { modules } from './modules';

(async function() {
    const logger = new Logger(LoggerLevel.Info);

    configChecker(logger).check();

    const seeder = new Seeder(logger);

    for (const module of modules) {
        for (const model of module.models) {
            await seeder.seed(model, true);
        }
    }

    seeder.cleanup();
})();
