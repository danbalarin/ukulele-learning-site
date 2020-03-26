import mongoose from 'mongoose';

const createConnection = () => {
    mongoose.Promise = global.Promise;

    const connection = mongoose.connect(process?.env?.MONGODB_URI as string, {
        autoIndex: true,
        poolSize: 50,
        bufferMaxEntries: 0,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    mongoose.set('useCreateIndex', true);
    return connection;
};

export default createConnection;
