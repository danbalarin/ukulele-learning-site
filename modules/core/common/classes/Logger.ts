/**
 * Logger level
 */
export enum LoggerLevel {
    Debug,
    Info,
    Success,
    Warning,
    Error,
}

/**
 * Logging function interface
 */
export abstract class Logger {
    _level: LoggerLevel;

    /**
     *
     * @param level Minimum logger level that is shown
     */
    constructor(level: LoggerLevel) {
        this._level = level;
    }

    /**
     * Logs informative message.
     */
    info(message: string): void {
        this.showMessage(LoggerLevel.Info, message);
    }

    /**
     * Logs warning message
     */
    warning(message: string): void {
        this.showMessage(LoggerLevel.Warning, message);
    }

    /**
     * Logs error message
     */
    error(message: string): void {
        this.showMessage(LoggerLevel.Error, message);
    }

    /**
     * Logs debug message
     */
    debug(message: string): void {
        this.showMessage(LoggerLevel.Debug, message);
    }

    /**
     * Logs success message
     */
    success(message: string): void {
        this.showMessage(LoggerLevel.Success, message);
    }

    /**
     * Shows message
     *
     * @param level Message level
     * @param message Message content
     */
    abstract showMessage(level: LoggerLevel, message: string): void;
}

/**
 * No operation logger
 *
 * Each log function({@link debug}, {@link info}, {@link success}, {@link warning} and {@link error})
 * will NOT output anything into stdout, errout or any file
 */
export class NoopLogger extends Logger {
    showMessage(level: LoggerLevel, message: string): void {}
    constructor() {
        super(0);
    }
}
