import { validateUnique } from './validateUnique';

let validator: any;

interface TestingObj {
    id: string;
    name: string;
}

interface SimpleModel<T> {
    find: (field: { [key: string]: string }) => Promise<T[]>;
}

class NoopError {}

beforeEach(() => {
    validator = validateUnique(NoopError);
});

it('should create function', () => {
    expect(validator).toBeInstanceOf(Function);
});

it('should pass with no fields', async () => {
    await validator([], {});
});

it('should pass with fields', async () => {
    const fields = { id: 'id', name: 'name' };

    // simulate no results
    const model: SimpleModel<TestingObj> = {
        find: async field => [],
    };
    await validator(fields, model);
});

it("should't pass with one field matching", async () => {
    const fields = { id: 'id', name: 'name' };

    // simulate one result
    const model: SimpleModel<TestingObj> = {
        find: async field => [{ id: 'id', name: 'aaa' }],
    };
    try {
        await validator(fields, model);
        expect(true).toBe(false);
    } catch (err) {
        expect(err).toBeInstanceOf(NoopError);
    }
});

it("should't pass with multiple fields matching", async () => {
    const fields = { id: 'id', name: 'name' };

    // simulate multiple results
    const model: SimpleModel<TestingObj> = {
        find: async field => [
            { id: 'id', name: 'aaa' },
            { id: 'aa', name: 'name' },
        ],
    };
    try {
        await validator(fields, model);
        expect(true).toBe(false);
    } catch (err) {
        expect(err).toBeInstanceOf(NoopError);
    }
});
