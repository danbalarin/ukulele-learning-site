import dotenv from 'dotenv';

import { ConfigChecker } from '@uls/core-common';

import { Logger } from './Logger';

const CONFIG_VALUES = [
    { name: 'NODE_ENV', required: true },
    { name: 'PORT', required: true },
    { name: 'MONGODB_URI', required: true },
    { name: 'MONGODB_URI_LOCAL', required: false },
    { name: 'JWT_SECRET', required: true },
];

const createConfigChecker = (logger: Logger) => {
    return new ConfigChecker(
        process?.env as object,
        CONFIG_VALUES,
        logger,
        dotenv.config,
        true
    );
};

export default createConfigChecker;
