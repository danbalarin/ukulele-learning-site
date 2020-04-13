/**
 * Provides core interfaces and classes for NodeJS part of application.
 */

export { validateUnique } from './functions/validateUnique';

export { SeedFaker } from './interfaces/SeedFaker';
export {
    ServerModule,
    ServerModuleErrors,
    ServerModuleModel,
    ServerModuleOptions,
    ServerModuleResponse,
} from './interfaces/ServerModule';

export { SearchOption, SearchGroup } from './interfaces/SearchGroup';
