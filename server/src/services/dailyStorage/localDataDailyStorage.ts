import BaseLocalStorageService from "../baseLocalStorage/baseLocalStorage";
import IDailyStorageService from "../../descriptors/IDailyStorageService";
import Logger from "../../logger";
import IReadingData from "../../descriptors/IReadingData";
import IDailyDataProvider from "../../descriptors/IDailyDataProivder";
import { getNormalizedDates, getDailyDataFileName } from "../../helpers/dateHelper";

export default class LocalDataDailyStorage extends BaseLocalStorageService implements IDailyStorageService, IDailyDataProvider
{
    constructor(logger: Logger) {
        super(logger);
    }

    fetchDailyData(month: number, date: number): Promise<IReadingData> {

        const fileName = getDailyDataFileName(month, date);

        this.logger.debug(this.logger.modules.SERVICES_DAILYCONTENT_LOCAL_STORAGE, `Reading daily content for month: ${month}, date: ${date}, from: ${fileName}`);

        return this.readFile(fileName)
            .then(data => JSON.parse(data));
    }

    writeDailyContent(month: number, date: number, readingData: IReadingData): Promise<void> {

        const fileName = getDailyDataFileName(month, date);

        this.logger.debug(this.logger.modules.SERVICES_DAILYCONTENT_LOCAL_STORAGE, `Writing daily content for month: ${month}, date: ${date} to ${fileName}`);

        return this.writeFile(fileName, JSON.stringify(readingData));
    }
}