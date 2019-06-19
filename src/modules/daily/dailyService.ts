import IModuleRequestHandler from "../../descriptors/IModuleRequestHandler";
import IDailyDataProvider from "../../descriptors/IDailyDataProivder";
import Logger from "../../logger";
import IReadingData, { IReadingNavData } from "../../descriptors/IReadingData";
import IMetadataProvider from "../../descriptors/IMetadata";

export default class DailyService implements IModuleRequestHandler
{
    constructor(
        private dailyDataProvider: IDailyDataProvider, 
        private logger: Logger)
    {}

    requestHandler(request: import("express-serve-static-core").Request, response: import("express-serve-static-core").Response): void {
        const month = parseInt(request.query.month);
        const date = parseInt(request.query.date);

        this.logger.debug(this.logger.modules.MODULE_READINGS, `Reading daily data for ${month}, ${date}`);

        this.dailyDataProvider.fetchDailyData(month, date)
        .then(data => {
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify(data));
        })
    }
}