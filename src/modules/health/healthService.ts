import * as util from 'util';
import IModuleRequestHandler from "../../descriptors/IModuleRequestHandler";
import Logger from "../../logger";

export default class HealthService implements IModuleRequestHandler
{
    constructor(
        private logger: Logger
    ) {}

    requestHandler(request: import("express-serve-static-core").Request, response: import("express-serve-static-core").Response): void {
        response.setHeader('Content-Type', 'application/json');
        response.send(JSON.stringify({
            status: "OK",
            environment: process.env
        }));
    }
    
}