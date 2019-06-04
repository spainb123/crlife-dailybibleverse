import { Request, Response } from 'express-serve-static-core';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import * as cheerio from 'cheerio';
import IModuleRequestHandler from "../../descriptors/IModuleRequestHandler";
import Logger from '../../logger';
import IReadingsProvider from '../../descriptors/IReadingsProvider';

const indexFile = path.join(__dirname, './../../../public/index.html');
const readLocalFile: (pathname: string) => Promise<Buffer> = util.promisify(fs.readFile);

export default class ClientService implements IModuleRequestHandler {

    constructor(private readingsProvider: IReadingsProvider, private logger: Logger) {}

    requestHandler(request: Request, response: Response): void {

        this.logger.debug(this.logger.modules.MODULE_CLIENT, `Handling client request, ${util.inspect(request.params)}`)

        const now = new Date();
        let month = now.getMonth() + 1;
        let date = now.getDate();

        if (request.query.ref) {
            const parsed = this.parseRef(request.query.ref);
            if (!parsed.valid) 
            { 
                response.sendStatus(402);
                return;
            }

            month = parsed.month;
            date = parsed.date;
        }

        // Fetch Reading
        this.readingsProvider.fetchReadings(month, date)
            .then(data => {
                // Inject the data into the SSR entry in index and serve
                this.logger.debug(this.logger.modules.MODULE_CLIENT, `Injecting and serving reading data into ${indexFile}`);
                const content = cheerio.load(fs.readFileSync(indexFile));
                const script = content('#__CRDBV_SSR_DATA');
                script.append(JSON.stringify(data));

                response.send(content.html());
            })
    }
    
    private parseRef(ref: string) : { valid: boolean, month: number, date: number}
    {
        try {
            const value = parseInt(ref);
            if (value > 1231 || value < 101) {
                throw new Error('Invalid ref value.');
            }

            const builtDate = new Date(
                new Date().getFullYear(),
                value / 100,
                value % 100
            );

            return { valid: true, month: builtDate.getMonth(), date: builtDate.getDate() }

        } catch (e)
        {
            this.logger.debug(this.logger.modules.MODULE_CLIENT, `Error processing ref: ${ref}, ${e}`);
            return { valid: false, month: 0, date: 0}
        }
    }
}