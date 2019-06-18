import { getPrevDailyRef } from "../helpers/dateHelper";

export interface IMetadataEntry {
    ref : string,
    pass : { ot: string, nt: string, ps: string, pr: string },
    note : string[]
}

export default interface IMetadataProvider {
    getFirstEntry() : IMetadataEntry
    getEntry(ref: string) : IMetadataEntry
    getPrevEntry(ref: string) : IMetadataEntry
    getNextEntry(ref: string) : IMetadataEntry
}