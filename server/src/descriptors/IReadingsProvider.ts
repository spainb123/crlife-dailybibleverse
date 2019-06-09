import IPassageDataItem from "./IReadingData";

export default interface IReadingsProvider
{
    fetchReadings(month:number, date: number) : Promise<IPassageDataItem>
}