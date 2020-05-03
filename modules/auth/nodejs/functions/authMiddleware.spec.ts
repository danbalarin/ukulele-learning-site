import { authMiddleware } from './authMiddleware';

class NoopError {}

let middleware: any;
beforeEach(() => {
    middleware = authMiddleware(NoopError);
});

it('should create middleware generating function', () => {
    expect(middleware).toBeInstanceOf(Function);
});

it('should create middleware function', () => {
    const middlewareRole = middleware(0);
    expect(middlewareRole).toBeInstanceOf(Function);
});

it('should throw', () => {
    try {
        middleware(0)(null, null, null, null, null);
        // shouldn't reach
        expect(true).toBe(false);
    } catch (err) {}
});

it('should throw correct error', () => {
    try {
        middleware(0)(null, null, null, null, null);
    } catch (err) {
        expect(err).toBeInstanceOf(NoopError);
    }
});

it('should check context for user and throw', () => {
    try {
        middleware(0)(null, null, null, {}, null);
    } catch (err) {
        expect(err).toBeInstanceOf(NoopError);
    }
});

it('should compare roles and throw', () => {
    try {
        middleware(1)(null, null, null, { user: { role: 0 } }, null);
    } catch (err) {
        expect(err).toBeInstanceOf(NoopError);
    }
});

it('should compare roles and call resolve', () => {
    const resolver = jest.fn();
    try {
        middleware(1)(resolver, null, null, { user: { role: 1 } }, null);
    } catch (err) {
        // shouldn't throw
        expect(true).toBe(false);
    }
    expect(resolver).toBeCalledTimes(1);
});

it('should compare roles and call resolve with right arguments', () => {
    const resolver = jest.fn();
    const user = { user: { role: 1 } };
    try {
        middleware(1)(resolver, 'source', 'args', user, 'info');
    } catch (err) {
        // shouldn't throw
        expect(true).toBe(false);
    }
    expect(resolver).toBeCalledWith('source', 'args', user, 'info');
});
