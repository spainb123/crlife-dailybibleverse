import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import { getNormalizedDates } from '../../helpers/dateHelper';
import Logger from '../../logger';

const localDataDir = path.join(__dirname, './../../../data/dev');
const readLocalFile: (pathname: string) => Promise<Buffer> = util.promisify(fs.readFile);
const writeLocalFile: (pathname: string, content: string) => Promise<void> = util.promisify(fs.writeFile);

export default class BaseLocalStorageService {

    constructor(protected logger: Logger) {}

    readFile(month: number, date: number, file: string) : Promise<string>
    {
        const entryPath = this.getEntryPath(month, date, file);

        this.logger.debug(this.logger.modules.SERVICES_BASE_LOCAL_STORAGE, `Reading local file: ${entryPath}`);

        return readLocalFile(entryPath).then(data => data.toString());
    }

    writeFile(month: number, date: number, file: string, content: string) : Promise<void>
    {
        const entryPath = this.getEntryPath(month, date, file);

        this.logger.debug(this.logger.modules.SERVICES_BASE_LOCAL_STORAGE, `Writing local file to ${entryPath}`);

        return writeLocalFile(entryPath, content);
    }

    private getEntryPath(month: number, date: number, file: string)
    {
        const stringEntries = getNormalizedDates({ month, date });

        return path.join(localDataDir, stringEntries.month, stringEntries.date, file);
    }
}
