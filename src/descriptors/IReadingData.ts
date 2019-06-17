
export interface IPassageDataItem {
    heading: string,
    body: string
}
export default interface IReadingData {
    ref: string,
    fullDate: string,
    pass: {
        [ key: string ] : IPassageDataItem,
        ot: IPassageDataItem,
        nt: IPassageDataItem,
        ps: IPassageDataItem,
        pr: IPassageDataItem
    }
    note: {
        [ key : string ] : string,
        ot: string,
        nt: string,
        fs: string
    }
}
