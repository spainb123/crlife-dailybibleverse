import * as http from 'http';
import * as Config from './config';
import Logger from './logger';

const logger = new Logger();

const { app, config } = Config.default(logger);

const httpServer = http.createServer(app);

// listen on provided ports
httpServer.listen(config.get("port"));

// add error handler
httpServer.on("error", onError);

// start listening on port
httpServer.on("listening", onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: any) {
    if (error.syscall !== "listen") {
        throw error;
    }

    const httpPort = app.get("port");
    var bind = typeof httpPort === "string"
        ? "Pipe " + httpPort
        : "Port " + httpPort;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
        break;
            default:
        throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = httpServer.address();
    var bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr.port;
    console.log(`Process env APP_ENV: ${process.env.APP_ENV}`);
    console.log(`Process env DEBUG: ${process.env.DEBUG}`)
    console.log(`meta : ${config.get("meta")}`)
    console.log(`azure_storage: ${config.get("azure_storage")}`)
    logger.debug(logger.modules.SERVER, "Listening on " + bind);
}

