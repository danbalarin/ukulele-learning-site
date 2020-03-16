import { SeedFaker } from './Seed';
import { HashFunction } from './HashFunction';
import { SeedResult } from './Seed';
import { ResolverErrors } from './ResolverErrors';
import { TokenCreator } from './TokenCreator';

export interface ServerModule<T, P> {
    createSeed: (faker: SeedFaker, hashFn: HashFunction) => SeedResult<T>;
    createSchema: (
        hashFn: HashFunction,
        errors: ResolverErrors,
        tokenCreator: TokenCreator
    ) => P;
}
