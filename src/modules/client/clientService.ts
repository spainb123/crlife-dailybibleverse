import { Request, Response } from 'express-serve-static-core';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import * as cheerio from 'cheerio';
import IModuleRequestHandler from "../../descriptors/IModuleRequestHandler";
import Logger from '../../logger';
import IDailyDataProvider from '../../descriptors/IDailyDataProivder';
import { parseRef } from '../../helpers/dateHelper';

const indexFile = path.join(__dirname, './../../../public/index.html');

export default class ClientService implements IModuleRequestHandler {

    constructor(private dailyDataProvider: IDailyDataProvider, private logger: Logger) {}

    requestHandler(request: Request, response: Response): void {

        this.logger.debug(this.logger.modules.MODULE_CLIENT, `Handling client request, ${util.inspect(request.params)}`)

        const now = new Date();
        let month = now.getMonth() + 1;
        let date = now.getDate();

        if (request.query.ref) {
            const parsed = parseRef(request.query.ref);
            if (!parsed.valid) 
            { 
                response.sendStatus(402);
                return;
            }

            month = parsed.month;
            date = parsed.date;
        }

        // Fetch Reading
        this.dailyDataProvider.fetchDailyData(month, date)
            .then(data => {
                // Inject the data into the SSR entry in index and serve
                this.logger.debug(this.logger.modules.MODULE_CLIENT, `Injecting and serving reading data into ${indexFile}`);
                const content = cheerio.load(fs.readFileSync(indexFile));
                const script = content('#__CRDBV_SSR_DATA');
                script.append(JSON.stringify(data));

                response.send(content.html());
            })
    }    
}