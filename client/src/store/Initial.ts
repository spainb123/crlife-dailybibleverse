import { IStore, ActiveContentOption } from "./Models";

export const initialState : IStore = {
    activeEntry: 0,
    activeContent: ActiveContentOption.Devotional,
    entries: [
        {
            name: 'Entry 1',
            devotionContent: 'Devotion Content 1',
            readingContent: 'Reading Content 1'
        },
        {
            name: 'Entry 2',
            devotionContent: 'Devotion Content 2',
            readingContent: 'Reading Content 2'
        },
        {
            name: 'Entry 3',
            devotionContent: 'Devotion Content 3',
            readingContent: 'Reading Content 3'
        }
    ]
}
