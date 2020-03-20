import { TokenCreator, HashFunction } from '@uls/core-common';

import { SeedFaker } from './Seed';
import { SeedResult } from './Seed';
import { ResolverErrors } from './ResolverErrors';

/**
 * Server module interface.
 * 
 * Every NodeJS module should export two functions, seed creator and schema creator
 * @param T data returned by seed function
 * @param P created data schema
 */
export interface ServerModule<T, P> {
    createSeed: (faker: SeedFaker, hashFn: HashFunction) => SeedResult<T>;
    createSchema: (
        hashFn: HashFunction,
        errors: ResolverErrors,
        tokenCreator: TokenCreator
    ) => P;
}
