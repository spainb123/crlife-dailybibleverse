import IReadingData from "./IReadingData";

export default interface IDailyStorageReaderService {
    fetchDailyData(month: number, date: number): Promise<IReadingData>
}