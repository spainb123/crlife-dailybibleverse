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

    readFileAtEntryPath(month: number, date: number, file: string) : Promise<string>
    {
        const entryPath = this.getEntryPath(month, date, file);

        this.logger.debug(this.logger.modules.SERVICES_BASE_LOCAL_STORAGE, `Reading local file with entry path from: ${entryPath}`);

        return readLocalFile(entryPath).then(data => data.toString());
    }

    readFile(file: string) : Promise<string>
    {
        const filePath = path.join(localDataDir, file);

        this.logger.debug(this.logger.modules.SERVICES_BASE_LOCAL_STORAGE, `Reading local file from: ${filePath}`);

        return readLocalFile(filePath).then(data => data.toString());
    }

    writeFileAtEntryPath(month: number, date: number, file: string, content: string) : Promise<void>
    {
        const entryPath = this.getEntryPath(month, date, file);

        this.logger.debug(this.logger.modules.SERVICES_BASE_LOCAL_STORAGE, `Writing local file with entry path to ${entryPath}`);

        return writeLocalFile(entryPath, content);
    }

    writeFile(file: string, content: string) : Promise<void>
    {
        const filePath = path.join(localDataDir, file);

        this.logger.debug(this.logger.modules.SERVICES_BASE_LOCAL_STORAGE, `Writing local file to ${filePath}`);

        return writeLocalFile(filePath, content);
    }

    private getEntryPath(month: number, date: number, file: string)
    {
        const stringEntries = getNormalizedDates({ month, date });

        return path.join(localDataDir, stringEntries.month, stringEntries.date, file);
    }
}
