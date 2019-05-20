import * as Debug from 'debug';
import * as http from 'http';
import { bootstrap } from './server';

const debug = Debug("express:server");

const httpPort = normalizePort(process.env.PORT || 8080);

const app = bootstrap();
app.set("port", httpPort);

const httpServer = http.createServer(app);

// listen on provided ports
httpServer.listen(httpPort);

// add error handler
httpServer.on("error", onError);

// start listening on port
httpServer.on("listening", onListening);

function normalizePort(val: any) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: any) {
    if (error.syscall !== "listen") {
        throw error;
    }

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
    debug("Listening on " + bind);
    console.log(`Process env DEBUG: ${process.env.DEBUG}`)
}

