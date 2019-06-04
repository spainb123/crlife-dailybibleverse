import ReadingData from "./ReadingData";

export default interface IReadingsProvider
{
    fetchReadings(month:number, date: number) : Promise<ReadingData>
}