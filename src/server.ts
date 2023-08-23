import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
// Routes Imports
import authorRoutes from './routes/Author';
import BookRoutes from './routes/Book';
const app = express();

/**
 * Database connection
 */

mongoose
    .connect(config.mongo.host, {
        retryWrites: true,
        w: 'majority'
    })
    .then(() => {
        Logging.info('Connected to MongoDB');
        StartServer();
    })
    .catch((e) => {
        Logging.error('Unable to connect to MongoDB. Please check if the database is running.');
        Logging.error(e);
    });

/** Only start the server if Mongo Connects */
const StartServer = () => {
    app.use((req, res, next) => {
        /** Log the Request */
        Logging.info(`Incoming -> Method: [${req.method}] | URL: [${req.url}] | IP: [${req.socket.remoteAddress}]`);

        /** Send the response */
        res.on('finish', () => {
            Logging.info(`Outgoing -> Method: [${req.method}] | URL: [${req.url}] | IP: [${req.socket.remoteAddress}] | Status: [${res.statusCode}]`);
        });

        next();
    });
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    /** Rules of our API */
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, PATCH');
            return res.status(200).json({});
        }

        next();
    });

    /** Routes */
    app.use('/authors', authorRoutes);
    app.use('/books', BookRoutes);

    /** Health Check */
    app.get('/health', (req, res) => {
        res.status(200).send('OK');
    });

    /** Error Handling */

    app.use((req, res, next) => {
        const error = new Error('Not Found');
        Logging.error(error);
        return res.status(404).json({
            message: error.message
        });
    });

    http.createServer(app).listen(config.server.port, () => {
        Logging.info(`Server started on port ${config.server.port}`);
    });
};
