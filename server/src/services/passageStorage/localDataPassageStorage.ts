import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import IPassageStorageService from '../../descriptors/IPassageStorageService';
import IPassageEntry from '../../descriptors/IPassageEntry';
import { getNormalizedDates } from '../../helpers/passageEntryHelper';
import Logger from '../../logger';

const localDataDir = path.join(__dirname, './../../../data/dev');
const readFile: (pathname: string) => Promise<Buffer> = util.promisify(fs.readFile);
const writeFile: (pathname: string, content: string) => Promise<void> = util.promisify(fs.writeFile);


export default class LocalDataPassageStorageService implements IPassageStorageService {

    constructor(private logger: Logger) {}

    readPassage(entry: IPassageEntry): Promise<string> {

        this.logger.debug(this.logger.modules.SERVICES_PASSAGES_LOCAL_STORAGE, `Reading passage for entry: ${util.inspect(entry)}`);

        return readFile(this.getEntryPath(entry))
            .then(data => data.toString());
    }    
    
    writePassage(entry: IPassageEntry, content: string): Promise<void> {
        const entryPath = this.getEntryPath(entry);

        this.logger.debug(this.logger.modules.SERVICES_PASSAGES_LOCAL_STORAGE, `Writing passage for entry: ${util.inspect(entry)} to ${entryPath}`);

        return writeFile(entryPath, content);
    }

    private getEntryPath(entry:IPassageEntry)
    {
        const stringEntries = getNormalizedDates(entry);

        return path.join(localDataDir, stringEntries.month, stringEntries.date, `pass-${entry.entryType}.html`);
    }
}