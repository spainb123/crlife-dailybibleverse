import Logger from '../../logger';
import IDailyDataProvider from "../../descriptors/IDailyDataProivder";
import IDailyStorageReaderService from "../../descriptors/IDailyStorageReaderService";
import IReadingData, { IReadingNavData } from "../../descriptors/IReadingData";
import IMetadataProvider from "../../descriptors/IMetadata";
import { getNormalizedDates, parseRef } from "../../helpers/dateHelper";

export default class DailyDataProviderService implements IDailyDataProvider
{
    constructor(
        private dailyStorageReader : IDailyStorageReaderService,
        private metadata: IMetadataProvider, 
        private logger: Logger
    ) {}

    fetchDailyData(month: number, date: number): Promise<IReadingData & IReadingNavData> {

        // Confirm daily data in meta
        const nDates = getNormalizedDates({ month, date });
        if (this.metadata.getEntry(nDates.ref) === null)
        {
            const newRef = parseRef(this.metadata.getFirstEntry().ref);
            month = newRef.month;
            date = newRef.date;
        }

        this.logger.debug(this.logger.modules.SERVICES_DAILYPROVIDER, `Fetching daily data for month=${month}, date=${date}`);

        return this.dailyStorageReader.fetchDailyData(month, date)
            .then((data: IReadingData) => {
                // Attach ReadingNav Data before returning
                const nextEntry = this.metadata.getNextEntry(data.ref);
                const prevEntry = this.metadata.getPrevEntry(data.ref);
                
                const joinedData : IReadingData & IReadingNavData = {...{ prev: prevEntry.ref, next: nextEntry.ref }, ...data }
                return joinedData;
            })
    }    
}