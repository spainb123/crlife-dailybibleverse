import * as util from 'util';
import IPassageStorageService from '../../descriptors/IPassageStorageService';
import IPassageEntry from '../../descriptors/IPassageEntry';
import Logger from '../../logger';
import BaseLocalStorageService from '../baseLocalStorage/baseLocalStorage';

export default class LocalDataPassageStorageService extends BaseLocalStorageService implements IPassageStorageService {

    constructor(logger: Logger) {
        super(logger);
    }

    readPassage(entry: IPassageEntry): Promise<string> {

        this.logger.debug(this.logger.modules.SERVICES_PASSAGES_LOCAL_STORAGE, `Reading passage for entry: ${util.inspect(entry)}`);

        return this.readFileAtEntryPath(entry.month, entry.date, `pass-${entry.entryType}.html`);
    }    
    
    writePassage(entry: IPassageEntry, content: string): Promise<void> {

        this.logger.debug(this.logger.modules.SERVICES_PASSAGES_LOCAL_STORAGE, `Writing passage for entry: ${util.inspect(entry)}`);

        return this.writeFileAtEntryPath(entry.month, entry.date, `pass-${entry.entryType}.html`, content);
    }
}