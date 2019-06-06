import IReadingData from "./IReadingData";

export default interface IReadingsProvider
{
    fetchReadings(month:number, date: number) : Promise<IReadingData>
}