import dotenv from 'dotenv';
dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_DB = process.env.MONGO_DB || '';
const MONGO_HOST = `mongodb://localhost:27017/${MONGO_DB}`;

const SERVER_PORT = process.env.SERVER_PORT || 1122;

export const config = {
    mongo: {
        username: MONGO_USERNAME,
        password: MONGO_PASSWORD,
        host: MONGO_HOST
    },
    server: {
        port: SERVER_PORT
    }
};
