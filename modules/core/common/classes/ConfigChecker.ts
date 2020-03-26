import { Logger } from './Logger';

/**
 * Value that should be in config
 */
export interface ConfigValue {
    /**
     * Config value name
     */
    name: string;

    /**
     * Flag whether this value is required or just nice to have
     */
    required?: boolean;
}

/**
 * Class providing one time runtime check of config values. Supports non-required values too.
 *
 * @param baseObject Object that should contain specified values
 * @param values Array of values to be present on `baseObject`
 * @param logger Logging function
 * @param initializeFunction Function that should be run before check
 * @param throwIfNotFound When this is true, error is thrown after first requried value is not found
 */
export class ConfigChecker {
    _baseObject: any;
    _values: ConfigValue[];
    _logger: Logger;
    _initializeFunction?: () => void;
    _throwIfNotFound: boolean;

    constructor(
        baseObject: any,
        values: ConfigValue[],
        logger: Logger,
        initializeFunction?: () => void,
        throwIfNotFound: boolean = true
    ) {
        this._baseObject = baseObject;
        this._values = values;
        this._logger = logger;
        this._initializeFunction = initializeFunction;
        this._throwIfNotFound = throwIfNotFound;
    }

    /**
     * Checks baseObject for values
     *
     * @returns boolean whether check was successfull
     */
    check(): boolean {
        this.initialize();
        let result = true;
        for (const value of this._values) {
            const found = this._baseObject && !!this._baseObject[value.name];
            if (!found) {
                this.missingValue(value);
                result = result && !value.required;
            }
        }
        return result;
    }

    /**
     * Reports missing value.
     * @param value Value that was not found
     */
    private missingValue(value: ConfigValue): void {
        const message = `Value ${value.name} is missing in aplication config.`;
        value.required
            ? this._logger.error(message)
            : this._logger.warning(message);
        if (value.required && this._throwIfNotFound) {
            throw new Error(message);
        }
    }

    /**
     * Runs initializaton function shen one is present
     */
    private initialize(): void {
        this._initializeFunction && this._initializeFunction();
    }
}
