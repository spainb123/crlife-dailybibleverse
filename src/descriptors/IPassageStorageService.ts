import IPassageEntry from "./IPassageEntry";

export default interface IPassageStorageService {
    readPassage(entry: IPassageEntry) : Promise<string>
    writePassage(entry: IPassageEntry, content: string) : void
}