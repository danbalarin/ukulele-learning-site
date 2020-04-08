import chalk from 'chalk';

import { Logger as ILogger, LoggerLevel } from '@uls/core-common';
export { LoggerLevel };

const SETTINGS: any = [];
SETTINGS[LoggerLevel.Info] = { emote: 'ℹ', color: chalk.cyan };
SETTINGS[LoggerLevel.Debug] = { emote: '🚧', color: chalk.gray };
SETTINGS[LoggerLevel.Error] = { emote: '❌', color: chalk.red };
SETTINGS[LoggerLevel.Warning] = { emote: '⚠', color: chalk.yellow };
SETTINGS[LoggerLevel.Success] = { emote: '✔', color: chalk.green };

class Logger extends ILogger {
    showMessage(type: LoggerLevel, message: string | object) {
        const formattedMessage =
            typeof message === 'string' ? message : JSON.stringify(message);
        if (type >= this._level) {
            const setting = SETTINGS[type];
            console.log(setting.color(`${setting.emote} ${formattedMessage}`));
        }
    }
}

export { Logger };
