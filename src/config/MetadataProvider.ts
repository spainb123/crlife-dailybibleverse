import * as path from 'path';
import * as fs from 'fs';
import IMetadataProvider, { IMetadataEntry } from '../descriptors/IMetadata';
const metaConfigFile = path.join(__dirname, './../../data/meta.json');

export default class MetadataProvider implements IMetadataProvider
{
    private metadata : any;

    constructor(metaData : any | null = null) {
        if (metaData) { 
            this.metadata = metaData; 
        }
        else {
            this.metadata = JSON.parse(fs.readFileSync(metaConfigFile).toString());
        }
    }

    getFirstEntry() : IMetadataEntry {
        return this.getEntryAtIndex(0);
    }

    getEntry(ref: string): IMetadataEntry {
        const index = this.getEntryIndex(ref);
        if (index === -1) return null;
        return this.getEntryAtIndex(index);
    }

    getPrevEntry(ref: string): IMetadataEntry {
        let index = this.getEntryIndex(ref);
        if (index === 0) { index = this.metadata.length - 1 }
        else { index--; }

        return this.getEntryAtIndex(index);
    }

    getNextEntry(ref: string): IMetadataEntry {
        let index = this.getEntryIndex(ref);
        if (index === this.metadata.length - 1) { index = 0;}
        else { index++ }

        return this.getEntryAtIndex(index);
    }

    getRawMetadata() {
        return this.metadata;
    }
    
    private getEntryIndex(ref: string) : number {
        return this.metadata.findIndex((e : any) => e[0] === ref);        
    }

    private getEntryAtIndex(index: number) : IMetadataEntry {
        const entry = <IMetadataEntry>this.metadata[index][1];
        entry.ref = <string>this.metadata[index][0];
        return entry;
    }
}
