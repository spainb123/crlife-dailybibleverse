import 'jest';
import MetadataProvider from '../MetadataProvider';
import IMetadataProvider from '../../descriptors/IMetadata';
import ConfigProvider from '../ConfigProvider';

const metadata = [
    [ "0601", {
        "pass" :
        {
            "ot" : "2Samuel.18:1-19:10",
            "nt" : "John.20:1-31",
            "ps" : "Psalm.119:153-176",
            "pr" : "Proverbs.16:14-15"
        },
        "note" : [
            "ot",
            "nt",
            "fs"
        ]        
    } ],
    [ "0602", {
            "pass" :
            {
                "ot" : "2Samuel.19:11-20:13",
                "nt" : "John.21:1-25",
                "ps" : "Psalm.120:1-7",
                "pr" : "Proverbs.16:16-17"
            },
            "note" : [
                "ot",
                "nt"
            ]        
    } ], 
    [ "0603", {
        "pass" :
        {
            "ot" : "2Samuel.20:14-21:22",
            "nt" : "Acts.1:1-26",
            "ps" : "Psalm.121:1-8",
            "pr" : "Proverbs.16:18"
        },
        "note" : [
            "ot",
            "nt",
            "fs"
        ]        
    } ]
]

let metadataProvider : IMetadataProvider;
let configProvider : ConfigProvider;

describe('Metaloader', () => {
    beforeAll(() => {
        metadataProvider = new MetadataProvider(configProvider, metadata);
    })

    it('should return entry by ref', () => {
        expect(metadataProvider.getEntry("0601").ref).toEqual("0601");
        expect(metadataProvider.getEntry("0601").pass.ot).toEqual("2Samuel.18:1-19:10");
        expect(metadataProvider.getEntry("0602").ref).toEqual("0602");
        expect(metadataProvider.getEntry("0602").note).toMatchObject([ 'ot', 'nt' ]);
    })

    it('should return previous entries', () => {
        expect(metadataProvider.getPrevEntry("0603").ref).toEqual("0602");
        expect(metadataProvider.getPrevEntry("0602").ref).toEqual("0601");
        expect(metadataProvider.getPrevEntry("0601").ref).toEqual("0603");
    })

    it ('should return next entries', () => {
        expect(metadataProvider.getNextEntry("0601").ref).toEqual("0602");
        expect(metadataProvider.getNextEntry("0602").ref).toEqual("0603");
        expect(metadataProvider.getNextEntry("0603").ref).toEqual("0601");
    })

    it('should return null if ref is invalid', () => {
        expect(metadataProvider.getEntry("0531")).toBeNull();
        expect(metadataProvider.getEntry("")).toBeNull();
    })

    it('should return first entry for getFirstEntry', () => {
        expect(metadataProvider.getFirstEntry().ref).toEqual("0601");
    })
})