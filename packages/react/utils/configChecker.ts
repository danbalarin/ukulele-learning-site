import dotenv from 'dotenv';

import { ConfigChecker } from '@uls/core-common';

import { Logger } from './Logger';

const CONFIG_VALUES = [{ name: 'API_URL', required: true }];

const createConfigChecker = (logger: Logger) => {
    return new ConfigChecker(
        process.env,
        CONFIG_VALUES,
        logger,
        dotenv.config,
        true
    );
};

export default createConfigChecker;
