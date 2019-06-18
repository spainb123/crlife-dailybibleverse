
export interface IPassageDataItem {
    heading: string,
    body: string
}
export default interface IReadingData {
    ref: string,
<<<<<<< HEAD
=======
    prev: string,
    next: string,
>>>>>>> a72d24458671cd2f22a7234e1748a5e1b0ba029f
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
