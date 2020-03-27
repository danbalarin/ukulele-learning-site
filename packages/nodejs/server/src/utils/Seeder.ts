import { Mongoose } from 'mongoose';

import { ServerModuleResponse, ServerModuleModel } from '@uls/core-nodejs';

import createConnection from '../database';
import { Logger } from './Logger';

/**
 * Seeds database with values provided by each module
 */
export class Seeder {
    private _db?: Mongoose;
    private _logger: Logger;

    constructor(logger: Logger) {
        this._logger = logger;
    }

    /**
     * Seed one particular model
     * @param data model to be seeded
     * @param dropPrevious Flag whether previus data should be dropped before seed
     */
    async seed(model: ServerModuleModel, dropPrevious?: boolean): Promise<void> {
        if (!this._db) {
            this._db = await createConnection();
        }
        return this.seedModel(model.seed, model.name, dropPrevious);
    }

    private async seedModel(
        seed: any[],
        model: string,
        drop = false
    ): Promise<void> {
        if (!this._db) {
            throw new Error('Database no initialized');
        }
        const dbModel = this._db.model(model).collection;
        if (drop) {
            this._logger.info(`Dropping ${model}`);
            await dbModel
                .deleteMany({})
                .then(this.dropOk(model))
                .catch(this.dropErr(model));
        }
        this._logger.info(`Seeding ${model}`);
        await dbModel
            .insertMany(seed)
            .then(this.seedOk(model))
            .catch(this.seedErr(model));
    }

    cleanup() {
        this._db?.disconnect();
    }

    private seedOk = (model: string) => {
        return (res: any) => {
            this._logger.success(`${model} seeded`);
            this._logger.debug(res);
        };
    };

    private seedErr = (model: string) => {
        return (err: any) => {
            this._logger.error(`Failed seeding ${model}`);
            this._logger.error(err);
        };
    };

    private dropOk = (model: string) => {
        return (res: any) => {
            this._logger.success(`${model} dropped`);
            this._logger.debug(res);
        };
    };

    private dropErr = (model: string) => {
        return (err: any) => {
            this._logger.error(`Failed dropping ${model}`);
            this._logger.error(err);
        };
    };
}
