import { Request, Response } from 'express-serve-static-core';
import IModuleRequestHandler from "../../descriptors/IModuleRequestHandler";
import IPassageStorageService from "../../descriptors/IPassageStorageService";
import { PassageEntryType } from '../../descriptors/PassageEntryType';
import Logger from '../../logger';
import INoteStorageService from '../../descriptors/INoteStorageService';
import { NoteEntryType } from '../../descriptors/NoteEntryType';
import { getNormalizedDates, getFullDate } from '../../helpers/dateHelper';

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
    content: ContentType,
    type: PassageEntryType | NoteEntryType,
    data: string
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
                    content: ContentType.passage,
                    type,
                    data
                }
            })
        })

        const noteTypes = (<Array<string>>this.metadata[norDates.month][norDates.date]['note']).map(type => <NoteEntryType><unknown>type);
        const noteFetchers = noteTypes.map(type => {
            return this.fetchNote(month, date, type).then(data => {
                return <FetchedData>{
                    content: ContentType.note,
                    type, 
                    data
                }
            })
        })

        fetchers.push(...passFetchers);
        fetchers.push(...noteFetchers);

        Promise.all(fetchers).then(fetcherData => {
            const retval = this.buildResponse(fetcherData, getFullDate(month, date));
            response.send(retval);
        });
    }

    private fetchPassage(month: number, date: number, entryType: PassageEntryType) : Promise<string>
    {
        this.logger.debug(this.logger.modules.MODULE_READINGS, `Fetching passage for ${month}, ${date}, ${entryType}`);

        return this.passageStorageService.readPassage({
            month, 
            date, 
            entryType
        });
    }

    private fetchNote(month: number, date: number, entryType: NoteEntryType) : Promise<string>
    {
        this.logger.debug(this.logger.modules.MODULE_READINGS, `Fetching note for ${month}, ${date}, ${entryType}`);

        return this.noteStorageService.readNote({
            month, 
            date,
            entryType
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

        fetchedDataCollection.forEach(data => {

            if (data.content === ContentType.passage)
            {
                retval.pass[data.type] = data.data;
            }

            if (data.content === ContentType.note)
            {
                retval.note[data.type] = data.data;
            }
        });

        return retval;
    }
}



