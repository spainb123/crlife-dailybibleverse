import IModuleRequestHandler from "../../descriptors/IModuleRequestHandler";
import Logger from "../../logger";

export default class HealthService implements IModuleRequestHandler
{
    constructor(
        private logger: Logger
    ) {}

    requestHandler(request: import("express-serve-static-core").Request, response: import("express-serve-static-core").Response): void {

        const visibleSettings:any = {};

        // For a list of all keys (and other things) available to apps, see: http://whatazurewebsiteenvironmentvariablesareavailable.azurewebsites.net/
        const whitelistedKeys = [
            "DEBUG",
            "META",
            "_DAILY_AZURE",

            // Azure App Service specific keys
            "NODE_VERSION",
            "YARN_VERSION",
        ]
        const maskedKeys = [
            "_CUSTOM_APP_SETTING", 
            "NLT_API_KEY", 
            "AZURE_STORAGE_ACCOUNT_NAME", 
            "AZURE_STORAGE_ACCOUNT_ACCESS_KEY", 
            "AZURE_STORAGE_CONTAINER_NAME",
        ]

        whitelistedKeys.forEach(wk => {
            if (process.env[wk])
            {
                visibleSettings[wk] = process.env[wk];
            }
        })

        // Mask particular values
        maskedKeys.forEach(mk => {
            if (process.env[mk])
            {
                visibleSettings[mk] = process.env[mk].replace(/./g, '#');
            }    
        })

        response.setHeader('Content-Type', 'application/json');
        response.send(JSON.stringify({
            status: "OK",
            environment: visibleSettings
        }));
    }
    
}