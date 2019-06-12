import IReadingData from "./IReadingData";

export enum Selection 
{
    NotesOT,
    NotesNT,
    NotesFS,
    PassOT,
    PassNT,
    PassPS,
    PassPr
}

export interface IStore
{
    data: IReadingData
    selection: Selection
    footerExpanded: boolean
}