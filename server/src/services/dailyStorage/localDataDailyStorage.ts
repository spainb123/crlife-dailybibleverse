import BaseLocalStorageService from "../baseLocalStorage/baseLocalStorage";
import IDailyStorageService from "../../descriptors/IDailyStorageService";
import Logger from "../../logger";
import IReadingData from "../../descriptors/IReadingData";
import IDailyDataProvider from "../../descriptors/IDailyDataProivder";

export default class LocalDataDailyStorage extends BaseLocalStorageService implements IDailyStorageService, IDailyDataProvider
{
    constructor(logger: Logger) {
        super(logger);
    }

    fetchDailyData(month: number, date: number): Promise<IReadingData> {

        this.logger.debug(this.logger.modules.SERVICES_DAILYCONTENT_LOCAL_STORAGE, `Reading daily content for month: ${month}, date: ${date}`);

        return this.readFile(month, date, `daily.json`)
            .then(data => JSON.parse(data));
    }

    writeDailyContent(month: number, date: number, readingData: IReadingData): Promise<void> {

        this.logger.debug(this.logger.modules.SERVICES_DAILYCONTENT_LOCAL_STORAGE, `Writing daily content for month: ${month}, date: ${date}`);

        return this.writeFile(month, date, `daily.json`, JSON.stringify(readingData));
    }
}