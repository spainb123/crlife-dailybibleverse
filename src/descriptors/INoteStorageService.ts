import INoteEntry from "./INoteEntry";

export default interface INoteStorageService {
    readNote(entry: INoteEntry) : Promise<string>
}