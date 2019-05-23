export enum ActiveContentOption
{
    Devotional,
    Reading
}

export interface IStoreEntry
{
    name: string,
    devotionHeader: string,
    devotionContent: string,
    readingHeader: string,
    readingContent: string
}

export interface IStore
{
    loading: boolean,
    activeEntry: number,
    activeContent: ActiveContentOption,
    entries: Array<IStoreEntry>
}