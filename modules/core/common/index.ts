/**
 * This module provides core functionality to whole application independently on React or NodeJS
 *
 * It provides several interfaces and classes which all modules have to implement or use,
 * in order to have consistent and maintanable codebase
 * @packageDocumentation
 */

/** Classes */
export { ConfigChecker } from './classes/ConfigChecker';
export { Logger, LoggerLevel } from './classes/Logger';

/** Interfaces */
export { Creator } from './interfaces/Creator';
export { CreationDate } from './interfaces/CreationDate';
export { UpdateDate } from './interfaces/UpdateDate';
export { EntityBase } from './interfaces/EntityBase';
export { HashFunction } from './interfaces/HashFunction';
export { TokenCreator } from './interfaces/TokenCreator';
export { Updatable } from './interfaces/Updatable';
