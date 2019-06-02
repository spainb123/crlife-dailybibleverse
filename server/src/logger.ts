import * as Debug from 'debug';

interface ILOG_MODULE {
    [ key: string ] : string,
    SERVER: string,
    HELPERS: string,
    MODULE_PASSAGES: string,
    MODULE_READINGS: string,
    SERVICES_PASSAGES: string
}

export const LOG_MODULE : ILOG_MODULE = {
    SERVER: 'app:server',
    HELPERS: 'app:helpers',
    MODULE_PASSAGES: 'app:module:passages',
    MODULE_READINGS: 'app:module:readings',
    SERVICES_PASSAGES: 'app:services:passages'
}

export default class Logger
{
    private _debuggers : Debug.Debugger[];

    constructor() {
        this._debuggers = [];
        for(let key in LOG_MODULE)
        {
            const value = LOG_MODULE[key];
            this._debuggers[<any>value] = Debug(value);
        }        
    }

    debug(module: string, message: string) {
        const _debug = this._debuggers[<any>module];
        _debug(message);
    }

    public get modules() {
        return LOG_MODULE;
    }
}