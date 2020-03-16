// import server from './apollo';
import connection from './database';

import { UserSeed } from './modules/user';
import { Mongoose } from 'mongoose';

const seedModel = async (
    db: Mongoose,
    seed: any[],
    model: string,
    drop = false
) => {
    const dbModel = db.model(model).collection;
    if (drop) {
        await dbModel
            .deleteMany({})
            .then(dropOk(model))
            .catch(dropErr(model));
    }
    await dbModel
        .insertMany(seed)
        .then(seedOk(model))
        .catch(seedErr(model));
};

connection.then(async db => {
    await seedModel(db, UserSeed.data, UserSeed.model, true);
    process.exit(0);
});

const seedOk = (model: string, verbose = false) => {
    return (res: any) => {
        console.log(`${model} seeded`);
        if (verbose) {
            console.log(res);
        }
    };
};

const seedErr = (model: string) => {
    return (err: any) => {
        console.log(`failed seeding ${model} `, err);
    };
};

const dropOk = (model: string, verbose = false) => {
    return (res: any) => {
        console.log(`${model} dropped`);
        if (verbose) {
            console.log(res);
        }
    };
};

const dropErr = (model: string) => {
    return (err: any) => console.log(`failed dropping ${model} `, err);
};
