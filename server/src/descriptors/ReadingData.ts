export default interface ReadingData {
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
