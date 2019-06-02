import * as util from 'util';
import INoteStorageService from "../../descriptors/INoteStorageService";
import INoteEntry from "../../descriptors/INoteEntry";
import Logger from "../../logger";
import BaseLocalStorageService from '../baseLocalStorage/baseLocalStorage';

export default class LocalDataNoteStorageService extends BaseLocalStorageService implements INoteStorageService {

    constructor(logger: Logger) {
        super(logger);
    }

    readNote(entry: INoteEntry): Promise<string> {

        this.logger.debug(this.logger.modules.SERVICES_NOTES_LOCAL_STORAGE, `Reading notes for entry: ${util.inspect(entry)}`);

        return this.readFile(entry.month, entry.date, `note-${entry.entryType}.html`);
    }
} 