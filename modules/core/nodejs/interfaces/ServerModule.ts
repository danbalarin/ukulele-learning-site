import { TokenCreator, HashFunction } from '@uls/core-common';
import { SeedFaker } from './SeedFaker';

export interface ServerModuleErrors {
    authorizationError: any;
    inputError: any;
}

export interface ServerModuleOptions<STypeComposer = any> {
    errors: ServerModuleErrors;
    tokenCreator: TokenCreator;
    hashFunction: HashFunction;
    seedFaker: SeedFaker;
    creatorModel?: STypeComposer;
}

export interface SeedContext {
    [key: string]: any;
}

export interface ServerModuleModel<
    TSeed = any,
    RResolver = any,
    STypeComposer = any
> {
    name: string;
    mutation: { [key: string]: RResolver };
    query: { [key: string]: RResolver };
    seed: TSeed;
    searchQuery?: RResolver;
    typeComposer: STypeComposer;
}

export interface ServerModuleResponse {
    models: ServerModuleModel[];
}

export interface ServerModule {
    init: (options: ServerModuleOptions) => ServerModuleResponse;
}
