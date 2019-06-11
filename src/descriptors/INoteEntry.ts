import { NoteEntryType } from './NoteEntryType';

export default interface INoteEntry {
    month: number,
    date: number,
    entryType: NoteEntryType
}