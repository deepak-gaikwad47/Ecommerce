import express from 'express';
import configuration from './config/configuration.js';
import app from './app.js'
import connectDataBase from './libs/database.js';

export default class Server {
    constructor(configuration) {
        this.app = express();
    }
    uncaughtExceptionError() {
        process.on("uncaughtException", err => {
            console.log(`Error: ${err.message}`)
            console.log("Shutting down server due to unhandled promise rejection");
            process.exit(1);
        })
    }
    startServer() {
        const { port } = configuration;
        app.listen(port, () => {
            console.log(`App is running on PORT ${port}`);
        })
    }
    unhandledRejectionError() {
        process.on("unhandledRejection", err => {
            console.log(`Error: ${err.message}`)
            console.log("Shutting down server due to unhandled promise rejection");
            process.exit(1);
        })
    }
}

const server = new Server(configuration);
server.uncaughtExceptionError();
server.startServer();
server.unhandledRejectionError();
connectDataBase();


