import IReadingData from "./IReadingData";

export default interface IDailyStorageWriterService {
    writeDailyContent(month: number, date: number, readingData: IReadingData): Promise<void>
}