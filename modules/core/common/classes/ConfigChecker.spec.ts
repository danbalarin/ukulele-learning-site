import SpyInstance = jest.SpyInstance;

import { ConfigChecker, ConfigValue } from './ConfigChecker';
import { Logger } from '../../../../packages/nodejs/server/src/utils/Logger';
import { NoopLogger, LoggerLevel } from './Logger';

const validConfig = { PORT: 4000, URL: 'www.test.com' };

const errorConfig = {};
const errorConfigWithNotRequired = { URL: 'www.test.com' };
const warningConfig = { PORT: 4000 };
const validConfigValues: ConfigValue[] = [
    { name: 'PORT', required: true },
    { name: 'URL', required: false },
];

let noopLogger: Logger;

beforeEach(() => {
    noopLogger = new NoopLogger();
});

it('#throwIfNotFound should default to true', () => {
    const configChecker = new ConfigChecker(
        errorConfig,
        validConfigValues,
        noopLogger
    );
    const check = () => configChecker.check();
    expect(check).toThrow();
});

describe('without throw', () => {
    it('should call initialize', () => {
        let valid = false;
        const configChecker = new ConfigChecker(
            {},
            [],
            noopLogger,
            () => (valid = true),
            false
        );

        configChecker.check();
        expect(valid).toBe(true);
    });

    it('should successfully check values', () => {
        const configChecker = new ConfigChecker(
            validConfig,
            validConfigValues,
            noopLogger,
            undefined,
            false
        );

        const res = configChecker.check();
        expect(res).toEqual(true);
    });

    it('should successfully check values with warning', () => {
        const configChecker = new ConfigChecker(
            warningConfig,
            validConfigValues,
            noopLogger,
            undefined,
            false
        );

        const warningSpy: SpyInstance = jest.spyOn(noopLogger, 'warning');
        expect(warningSpy).not.toHaveBeenCalled();
        const res = configChecker.check();
        expect(res).toEqual(true);
        expect(warningSpy).toHaveBeenCalled();
    });

    it('should fail', () => {
        const configChecker = new ConfigChecker(
            errorConfig,
            validConfigValues,
            noopLogger,
            undefined,
            false
        );

        const res = configChecker.check();
        expect(res).toEqual(false);

        const configCheckerWarning = new ConfigChecker(
            errorConfigWithNotRequired,
            validConfigValues,
            noopLogger,
            undefined,
            false
        );

        const resWarning = configCheckerWarning.check();
        expect(resWarning).toEqual(false);
    });
});

describe('with throw', () => {
    it('should call initialize', () => {
        let valid = false;
        const configChecker = new ConfigChecker(
            {},
            [],
            noopLogger,
            () => (valid = true),
            true
        );

        configChecker.check();
        expect(valid).toBe(true);
    });

    it('should successfully check values', () => {
        const configChecker = new ConfigChecker(
            validConfig,
            validConfigValues,
            noopLogger,
            undefined,
            true
        );

        const res = configChecker.check();
        expect(res).toEqual(true);
    });

    it('should successfully check values with warning', () => {
        const configChecker = new ConfigChecker(
            warningConfig,
            validConfigValues,
            noopLogger,
            undefined,
            true
        );

        const warningSpy: SpyInstance = jest.spyOn(noopLogger, 'warning');
        expect(warningSpy).not.toHaveBeenCalled();
        const res = configChecker.check();
        expect(res).toEqual(true);
        expect(warningSpy).toHaveBeenCalled();
    });

    it('should fail', () => {
        const configChecker = new ConfigChecker(
            errorConfig,
            validConfigValues,
            noopLogger,
            undefined,
            true
        );
        const check = () => configChecker.check();
        expect(check).toThrow();

        const configCheckerWarning = new ConfigChecker(
            errorConfigWithNotRequired,
            validConfigValues,
            noopLogger,
            undefined,
            true
        );
        const checkWarning = () => configCheckerWarning.check();
        expect(checkWarning).toThrow();
    });
});
