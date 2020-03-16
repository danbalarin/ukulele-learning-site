import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.Promise = global.Promise;

const connection = mongoose.connect(process?.env?.MONGODB_URI as string, {
    autoIndex: true,
    poolSize: 50,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.set('useCreateIndex', true);

export default connection;
