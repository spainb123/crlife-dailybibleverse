import IReadingData, { IReadingNavData } from "./IReadingData";

export default interface IDailyDataProvider {
    fetchDailyData(month: number, date: number): Promise<IReadingData & IReadingNavData>
}