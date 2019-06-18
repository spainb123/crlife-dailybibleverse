import { IStore, Selection } from "./Models";

export const initialState : IStore = {
    selection: Selection.NotesOT,
    data: {
        fullDate: '',
        ref: '',
        prev: '',
        next: '',
        pass: {
            ot: 
            {
                heading: '',
                body: ''
            },
            nt:
            {
                heading: '',
                body: ''
            },
            ps:
            {
                heading: '',
                body: ''
            },
            pr: 
            {
                heading: '',
                body: ''
            },
        },
        note: {
            ot: '',
            nt: '',
            fs: ''
        }
    },
    footerExpanded: false
}