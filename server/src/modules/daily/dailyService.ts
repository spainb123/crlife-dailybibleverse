import IModuleRequestHandler from "../../descriptors/IModuleRequestHandler";
import IDailyDataProvider from "../../descriptors/IDailyDataProivder";
import Logger from "../../logger";
import { getNormalizedDates } from "../../helpers/dateHelper";

export default class DailyService implements IModuleRequestHandler
{
    constructor(
        private dailyStorageService: IDailyDataProvider, 
        private logger: Logger)
    {}

    requestHandler(request: import("express-serve-static-core").Request, response: import("express-serve-static-core").Response): void {
        const month = parseInt(request.query.month);
        const date = parseInt(request.query.date);

        this.logger.debug(this.logger.modules.MODULE_READINGS, `Reading daily data for ${month}, ${date}`);

        this.dailyStorageService.fetchDailyData(month, date).then(data => {
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify(data));
        })
    }
}