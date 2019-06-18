import IReadingData from "./IReadingData";

export enum Selection 
{
    None,
    NotesOT,
    NotesNT,
    NotesFS,
    PassOT,
    PassNT,
    PassPS,
    PassPr
}

export enum NavRef
{
    Prev,
    Next
}

export interface IStore
{
    data: IReadingData
    selection: Selection
    footerExpanded: boolean
}