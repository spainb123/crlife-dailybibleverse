import { IStore, ActiveContentOption } from "./Models";

export const initialState : IStore = {
    loading: true,
    activeEntry: 0,
    activeContent: ActiveContentOption.Devotional,
    entries: []
}
