export enum ActiveContentOption
{
    Devotional,
    Reading
}

export interface IStoreEntry
{
    name: string,
    devotionContent: string,
    readingContent: string
}

export interface IStore
{
    activeEntry: number,
    activeContent: ActiveContentOption,
    entries: Array<IStoreEntry>
}