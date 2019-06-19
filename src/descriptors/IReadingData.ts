
export interface IPassageDataItem {
    heading: string,
    body: string
}
export interface IReadingNavData {
    prev: string, 
    next: string
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
