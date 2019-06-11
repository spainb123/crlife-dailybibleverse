import IModuleRequestHandler from "../../descriptors/IModuleRequestHandler";
import Logger from "../../logger";

export default class HealthService implements IModuleRequestHandler
{
    constructor(
        private logger: Logger
    ) {}

    requestHandler(request: import("express-serve-static-core").Request, response: import("express-serve-static-core").Response): void {

        const settings = {...process.env};
        const maskedKeys = ["_CUSTOM_APP_SETTING", "NLT_API_KEY", "AZURE_STORAGE_ACCOUNT_NAME", "AZURE_STORAGE_ACCOUNT_ACCESS_KEY", "AZURE_STORAGE_CONTAINER_NAME" ]

        // Mask particular values
        maskedKeys.forEach(mk => {
            if (settings[mk])
            {
                settings[mk] = settings[mk].replace(/./g, '#');
            }    
        })

        response.setHeader('Content-Type', 'application/json');
        response.send(JSON.stringify({
            status: "OK",
            environment: settings
        }));
    }
    
}