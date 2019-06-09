import BaseLocalStorageService from "../baseLocalStorage/baseLocalStorage";
import IDailyStorageService from "../../descriptors/IDailyStorageService";
import Logger from "../../logger";
import IReadingData from "../../descriptors/IReadingData";
import IDailyDataProvider from "../../descriptors/IDailyDataProivder";
import { getNormalizedDates } from "../../helpers/dateHelper";

export default class LocalDataDailyStorage extends BaseLocalStorageService implements IDailyStorageService, IDailyDataProvider
{
    constructor(logger: Logger) {
        super(logger);
    }

    fetchDailyData(month: number, date: number): Promise<IReadingData> {

        const fileName = this.getDailyFileName(month, date);

        this.logger.debug(this.logger.modules.SERVICES_DAILYCONTENT_LOCAL_STORAGE, `Reading daily content for month: ${month}, date: ${date}, from: ${fileName}`);

        return this.readFile(fileName)
            .then(data => JSON.parse(data));
    }

    writeDailyContent(month: number, date: number, readingData: IReadingData): Promise<void> {

        const fileName = this.getDailyFileName(month, date);

        this.logger.debug(this.logger.modules.SERVICES_DAILYCONTENT_LOCAL_STORAGE, `Writing daily content for month: ${month}, date: ${date} to ${fileName}`);

        return this.writeFile(fileName, JSON.stringify(readingData));
    }

    getDailyFileName(month: number, date: number)
    {
        const normalizedDates = getNormalizedDates({ month, date });
        return `${normalizedDates.month}${normalizedDates.date}-daily.json`;

    }
}