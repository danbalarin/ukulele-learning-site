import { Logger, NoopLogger, LoggerLevel } from './Logger';

let noopLogger: NoopLogger;

beforeEach(() => {
    noopLogger = new NoopLogger();
});

it('#NoopLogger should not write to console', () => {
    const logSpy = jest.spyOn(console, 'log');
    noopLogger.error('');
    expect(logSpy).not.toHaveBeenCalled();
});

it('should call showMessage exactly once for each message type', () => {
    const showMessageSpy = jest.spyOn(noopLogger, 'showMessage');

    /** DEBUG */
    noopLogger.debug('debug');
    expect(showMessageSpy).toHaveBeenCalledTimes(1);
    expect(showMessageSpy).toHaveBeenLastCalledWith(LoggerLevel.Debug, 'debug');

    /** INFO */
    noopLogger.info('info');
    expect(showMessageSpy).toHaveBeenCalledTimes(2);
    expect(showMessageSpy).toHaveBeenLastCalledWith(LoggerLevel.Info, 'info');

    /** SUCCESS */
    noopLogger.success('success');
    expect(showMessageSpy).toHaveBeenCalledTimes(3);
    expect(showMessageSpy).toHaveBeenLastCalledWith(
        LoggerLevel.Success,
        'success'
    );

    /** WARNING */
    noopLogger.warning('warning');
    expect(showMessageSpy).toHaveBeenCalledTimes(4);
    expect(showMessageSpy).toHaveBeenLastCalledWith(
        LoggerLevel.Warning,
        'warning'
    );

    /** ERROR */
    noopLogger.error('error');
    expect(showMessageSpy).toHaveBeenCalledTimes(5);
    expect(showMessageSpy).toHaveBeenLastCalledWith(LoggerLevel.Error, 'error');
});
