import { TokenCreator, HashFunction } from '@uls/core-common';
import { SeedFaker } from './SeedFaker';

export interface ServerModuleErrors {
    authorizationError: any;
    inputError: any;
}

export interface ServerModuleOptions {
    errors: ServerModuleErrors;
    tokenCreator: TokenCreator;
    hashFunction: HashFunction;
    seedFaker: SeedFaker;
    creatorModel: string;
}

export interface ServerModuleModel<T = any, M = any, Q = any> {
    name: string;
    mutation: { [key: string]: M };
    query: { [key: string]: Q };
    seed: T;
    searchQuery?: any;
}

export interface ServerModuleResponse {
    models: ServerModuleModel[];
}

export interface ServerModule {
    init: (options: ServerModuleOptions) => ServerModuleResponse;
}
