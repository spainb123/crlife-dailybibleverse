import { PassageEntryType } from "./PassageEntryType";

export default interface IPassageEntry {
    month: number,
    date: number,
    entryType: PassageEntryType
}