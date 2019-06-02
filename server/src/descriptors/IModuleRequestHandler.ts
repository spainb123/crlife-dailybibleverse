import { Request, Response } from "express-serve-static-core";

export default interface IModuleRequestHandler {
    requestHandler(request: Request, response: Response) : void;
}