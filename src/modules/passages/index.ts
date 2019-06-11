import { fetchNLTData } from './nltService';
import { Request, Response } from 'express-serve-static-core';
import IPassageStorageService from './../../descriptors/IPassageStorageService';
import { PassageEntryType } from '../../descriptors/PassageEntryType';
import IModuleRequestHandler from '../../descriptors/IModuleRequestHandler';
import { getNormalizedDates } from '../../helpers/dateHelper';
import Logger from '../../logger';

interface PassagesQuery {
    month: number,
    date: number,
    type: string,
    write: boolean
}

export default class PassagesService implements IModuleRequestHandler
{
    constructor(
        private storage: IPassageStorageService, 
        private metadata: any,
        private logger: Logger)
    { }

    public requestHandler(request: Request, response: Response) : void {

        const params = (<PassagesQuery>request.query);
        const normalizedDates = getNormalizedDates(params);

        let types:PassageEntryType[] = [];
        if (params.type.includes(','))
        {
            types = params.type.split(',').map(type => <PassageEntryType><unknown>type);
        }
        else
        {
            types.push(<PassageEntryType><unknown>params.type)
        }

        let fetchers: Promise<string>[] = [];

        types.forEach(type => {
            const ref = this.metadata[normalizedDates.month][normalizedDates.date]['pass'][type];
            fetchers.push(this.fetchAndWriteData(ref, params.write, params.month, params.date, type))
        });

        Promise.all(fetchers).then(data => response.send(data));
    }

    private fetchAndWriteData(ref: string, write: boolean, month: number, date: number, type: PassageEntryType) : Promise<string> {
        return fetchNLTData( ref, this.logger )
        .then(data => {
            if (write)
            {
                this.storage.writePassage(
                    { 
                        month, 
                        date, 
                        entryType: type 
                    }, 
                    data);
            }

            return data;
        })

    }
}

