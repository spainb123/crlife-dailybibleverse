import 'jest';
import MetadataProvider from '../MetadataProvider';
import { IMetadataEntry } from '../../descriptors/IMetadata';

let metadataProvider : MetadataProvider;

describe('Metadata provider against meta file', () => {
    beforeAll(() => {
        metadataProvider = new MetadataProvider();
    })

    it('should contain an entry for 0601', () => {
        expect(metadataProvider.getEntry("0601").ref).toEqual("0601");
        expect(metadataProvider.getEntry("0601").pass.pr).toEqual("Proverbs.16:14-15")
    })

    it('should be able to parse all entries in meta.json', () => {
        const metadata : (string | IMetadataEntry)[][] = metadataProvider.getRawMetadata();

        metadata.forEach((e : any) => {

            const entry = metadataProvider.getEntry(e[0]);
            expect(entry.ref).toEqual(e[0]);
            expect(entry.pass.ot).not.toBeNull();
            expect(entry.pass.nt).not.toBeNull();
            expect(entry.pass.ps).not.toBeNull();
            expect(entry.pass.pr).not.toBeNull();

            expect(entry.note).not.toBeNull();
        })
    })
})