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
import IPassageDataItem from '../../descriptors/IReadingData';
import IReadingsProvider from '../../descriptors/IReadingsProvider';


export interface ReadingRef {
    month: number,
    date: number
}


enum ContentType {
    passage,
    note
}

interface FetchedData {
    heading: string,
    contentType: ContentType,
    type: PassageEntryType | NoteEntryType,
    body: string
}

export default class ReadingsService implements IModuleRequestHandler, IReadingsProvider
{
    constructor(
        private passageStorageService: IPassageStorageService,
        private noteStorageService: INoteStorageService,
        private metadata: any,
        private logger: Logger
    ) {}

    requestHandler(request: Request, response: Response): void {
        
        const month = parseInt(request.query.month);
        const date = parseInt(request.query.date);

        this.fetchReadings(month, date).then(data =>
            {
                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify(data));        
            })
    }

    fetchReadings(month:number, date: number) : Promise<IPassageDataItem>
    {
        const fetchers : Promise<FetchedData>[] = [];
        const stringDates = getNormalizedDates({ month, date });

        const passFetchers = [PassageEntryType.ot, PassageEntryType.nt, PassageEntryType.ps, PassageEntryType.pr].map(type => {
            return this.fetchPassage(month, date, type).then(data => {

                const heading = this.formatHeading(<string>this.metadata[stringDates.month][stringDates.date]['pass'][type]);

                return <FetchedData>{
                    heading,
                    contentType: ContentType.passage,
                    type,
                    body: data
                }
            })
        })

        const noteTypes = (<Array<string>>this.metadata[stringDates.month][stringDates.date]['note']).map(type => <NoteEntryType><unknown>type);
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

        return Promise.all(fetchers).then(fetcherData => {
            const retval = this.buildResponse(fetcherData, getFullDate(month, date));
            return retval;
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
            return `${body}`; 
        });
    }

    private fetchNote(month: number, date: number, entryType: NoteEntryType) : Promise<string>
    {
        this.logger.debug(this.logger.modules.MODULE_READINGS, `Fetching note for ${month}, ${date}, ${entryType}`);

        return this.noteStorageService.readNote({
            month, 
            date,
            entryType
        })
    }

    private formatHeading(heading: string) : string
    {
        heading = heading.replace('.', ' ');
        if (isNaN(parseInt(heading.substr(0, 1))))
        {
            return heading;
        }
        else {
            return heading.substr(0, 1) + ' ' + heading.substr(1)
        }
    }

    private buildResponse(fetchedDataCollection: FetchedData[], fullDate: string) : IPassageDataItem {

        const retval : IPassageDataItem = {
            fullDate,
            pass: {
                ot: { heading: '', body: '' },
                nt: { heading: '', body: '' },
                ps: { heading: '', body: '' },
                pr: { heading: '', body: '' }
            },
            note: {
                ot: '',
                nt: '',
                fs: ''
            }
        };

        fetchedDataCollection.forEach(fetched => {

            const body = encodeURIComponent(fetched.body);

            if (fetched.contentType === ContentType.passage)
            {
                retval.pass[fetched.type] = { heading: fetched.heading, body };
            }

            if (fetched.contentType === ContentType.note)
            {
                retval.note[fetched.type] = body;
            }
        });

        return retval;
    }
}



