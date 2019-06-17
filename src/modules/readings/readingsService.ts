import { Request, Response } from 'express-serve-static-core';
import * as cheerio from 'cheerio';
import IModuleRequestHandler from "../../descriptors/IModuleRequestHandler";
import IPassageStorageService from "../../descriptors/IPassageStorageService";
import { PassageEntryType } from '../../descriptors/PassageEntryType';
import Logger from '../../logger';
import INoteStorageService from '../../descriptors/INoteStorageService';
import { NoteEntryType } from '../../descriptors/NoteEntryType';
import { getNormalizedDates, getFullDate, getNextDailyRef, getPrevDailyRef } from '../../helpers/dateHelper';
import IReadingData from '../../descriptors/IReadingData';
import IDailyStorageService from '../../descriptors/IDailyStorageService';


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

export default class ReadingsService implements IModuleRequestHandler
{
    constructor(
        private passageStorageService: IPassageStorageService,
        private noteStorageService: INoteStorageService,
        private dailyStorageService: IDailyStorageService,
        private metadata: any,
        private logger: Logger
    ) {}

    requestHandler(request: Request, response: Response): void {
        
        const month = parseInt(request.query.month);
        const date = parseInt(request.query.date);
        const write = Boolean(request.query.write);

        this.fetchReadings(month, date).then(data =>
            {
                if (write)
                {
                    this.dailyStorageService.writeDailyContent(month, date, data);
                }

                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify(data));        
            })
    }

    fetchReadings(month:number, date: number) : Promise<IReadingData>
    {
        const fetchers : Promise<FetchedData>[] = [];
        const stringDates = getNormalizedDates({ month, date });
        const readingRef = `${stringDates.month}${stringDates.date}`;
        const nextRef = getNextDailyRef(readingRef, this.metadata);
        const prevRef = getPrevDailyRef(readingRef, this.metadata);

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
            const retval = this.buildResponse(fetcherData, readingRef, getFullDate(month, date));
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

        // Special case books
        const bookmap = [
            [ "1Sam", "1 Samuel" ],
            [ "2Samuel", "2 Samuel" ],
            [ "Kings", "1 Kings" ],
            [ "2Kgs", "2 Kings" ],
            [ "Chronicles", "1 Chronicles" ],
            [ "2Chr", "2 Chronicles"],
            [ "Corinthians", "1 Corinthians"],
            [ "2Cor", "2 Corinthians"],
            [ "Thessalonians", "1 Thessalonians"],
            [ "2Thes", "2 Thessalonians"],
            [ "Timothy", "1 Timothy"],
            [ "2Tim", "2 Timothy"],
            [ "Peter", "1 Peter"],
            [ "2Pet", "2 Peter"],
            [ "1Jn", "1 John"],
            [ "2Jn", "2 John"],
            [ "3Jn", "3 John"],
        ]

        const specBook = bookmap.find( spec => {

            if (heading.substr(0, spec[0].length) === spec[0])
            {
                return true;
            }
        })

        if (specBook) {
            return specBook[1] + heading.substr(specBook[0].length);
        }
        
        return heading;
    }

    private buildResponse(fetchedDataCollection: FetchedData[], readingRef: string, fullDate: string) : IReadingData {

        const retval : IReadingData = {
            fullDate,
            ref: readingRef,
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



