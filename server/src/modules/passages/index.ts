import { fetchNLTData } from './nltService';
import { Request, Response } from 'express-serve-static-core';
import IPassageStorageService from './../../descriptors/IPassageStorageService';
import { PassageEntryType } from '../../descriptors/PassageEntryType';
import IModuleRequestHandler from '../../descriptors/IModuleRequestHandler';
import { getNormalizedDates } from '../../helpers/passageEntryHelper';

interface PassagesQuery {
    month: number,
    date: number,
    type: PassageEntryType,
    write: boolean
}

export default class PassagesService implements IModuleRequestHandler
{
    private storage: IPassageStorageService;
    private metadata: any;

    constructor(storage: IPassageStorageService, metadata: any)
    {
        this.storage = storage;
        this.metadata = metadata;
    }

    public requestHandler(request: Request, response: Response) : void {

        const params = (<PassagesQuery>request.query);
        const normalizedDates = getNormalizedDates(params);
        const ref = this.metadata[normalizedDates.month][normalizedDates.date]['pass'][params.type];

        fetchNLTData( ref )
            .then(data => {
                if (params.write)
                {
                    this.storage.writePassage(
                        { 
                            month: params.month, 
                            date: params.date, 
                            entryType: params.type 
                        }, 
                        data);
                }

                response.send(data);
            })
    }
}

