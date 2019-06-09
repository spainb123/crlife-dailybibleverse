import IReadingData from "./IReadingData";

export default interface IDailyStorageService {
    writeDailyContent(month: number, date: number, readingData: IReadingData): Promise<void>
}