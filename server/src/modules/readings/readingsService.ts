import { Request, Response } from 'express-serve-static-core';
import * as cheerio from 'cheerio';
import IModuleRequestHandler from "../../descriptors/IModuleRequestHandler";
import IPassageStorageService from "../../descriptors/IPassageStorageService";
import { PassageEntryType } from '../../descriptors/PassageEntryType';
import Logger from '../../logger';
import INoteStorageService from '../../descriptors/INoteStorageService';
import { NoteEntryType } from '../../descriptors/NoteEntryType';
import { getNormalizedDates, getFullDate } from '../../helpers/dateHelper';
import { Buffer } from 'buffer';


export interface ReadingRef {
    month: number,
    date: number
}

export interface ReadingData {
    fullDate: string,
    pass: {
        [ key: string ] : string,
        ot: string,
        nt: string,
        ps: string,
        pr: string
    }
    note: {
        [ key : string ] : string,
        ot: string,
        nt: string,
        fs: string
    }
}

enum ContentType {
    passage,
    note
}

interface FetchedData {
    contentType: ContentType,
    type: PassageEntryType | NoteEntryType,
    body: string
}

export default class ReadingsService implements IModuleRequestHandler
{
    constructor(
        private passageStorageService: IPassageStorageService,
        private noteStorageService: INoteStorageService,
        private metadata: any,
        private logger: Logger
    ) {}

    requestHandler(request: Request, response: Response): void {
        
        // Gather passages
        const month = request.query.month;
        const date = request.query.date;
        const norDates = getNormalizedDates({ month, date });

        const fetchers : Promise<FetchedData>[] = [];

        const passFetchers = [PassageEntryType.ot, PassageEntryType.nt, PassageEntryType.ps, PassageEntryType.pr].map(type => {
            return this.fetchPassage(month, date, type).then(data => {
                return <FetchedData>{
                    contentType: ContentType.passage,
                    type,
                    body: data
                }
            })
        })

        const noteTypes = (<Array<string>>this.metadata[norDates.month][norDates.date]['note']).map(type => <NoteEntryType><unknown>type);
        const noteFetchers = noteTypes.map(type => {
            return this.fetchNote(month, date, type).then(data => {
                return <FetchedData>{
                    contentType: ContentType.note,
                    type, 
                    body: data
                }
            })
        })

        fetchers.push(...passFetchers);
        fetchers.push(...noteFetchers);

        Promise.all(fetchers).then(fetcherData => {
            const retval = this.buildResponse(fetcherData, getFullDate(month, date));
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify(retval));
        });
    }

    private fetchPassage(month: number, date: number, entryType: PassageEntryType) : Promise<string>
    {
        this.logger.debug(this.logger.modules.MODULE_READINGS, `Fetching passage for ${month}, ${date}, ${entryType}`);

        return this.passageStorageService.readPassage({
            month, 
            date, 
            entryType
        }).then(data => {
            const body = cheerio.load(data)('body').html();
            return `<body>${body}</body>`; 
        });
    }

    private fetchNote(month: number, date: number, entryType: NoteEntryType) : Promise<string>
    {
        this.logger.debug(this.logger.modules.MODULE_READINGS, `Fetching note for ${month}, ${date}, ${entryType}`);

        return this.noteStorageService.readNote({
            month, 
            date,
            entryType
        }).then(data => {
            return `<body>${data}</body>`;
        });
    }

    private buildResponse(fetchedDataCollection: FetchedData[], fullDate: string) : ReadingData {

        const retval : ReadingData = {
            fullDate,
            pass: {
                ot: '',
                nt: '',
                ps: '',
                pr: ''
            },
            note: {
                ot: '',
                nt: '',
                fs: ''
            }
        };

        fetchedDataCollection.forEach(fetched => {

            const body = Buffer.from(fetched.body).toString('base64');

            if (fetched.contentType === ContentType.passage)
            {
                retval.pass[fetched.type] = body;
            }

            if (fetched.contentType === ContentType.note)
            {
                retval.note[fetched.type] = body;
            }
        });

        return retval;
    }
}



