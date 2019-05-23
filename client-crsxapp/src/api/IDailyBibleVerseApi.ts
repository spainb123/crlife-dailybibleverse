import { IStoreEntry } from "../store/Models";

export default interface IDailyBibleVerseApi
{
    getDailyData() : Promise<IStoreEntry[]>
}