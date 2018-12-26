import { ActiveContentOption, IStoreEntry } from "./Models";

export const SET_ACTIVE_ENTRY = 'SET_ACTIVE_ENTRY';
export const SET_ACTIVE_CONTENT = 'SET_ACTIVE_CONTENT';
export const LOAD_DBVDATA_SUCCESS = 'LOAD_DBVDATA_SUCCESS';

export interface IAction
{
    type: string
}

export interface ISetActiveEntryAction extends IAction
{
    index: number
}

export interface ISetActiveContentAction extends IAction
{
    activeContent: ActiveContentOption
}

export interface ILoadDailyBibleVersesSuccess extends IAction
{
    entries: IStoreEntry[]
}

export function setActiveEntry(index: number) : ISetActiveEntryAction
{
    return { type: SET_ACTIVE_ENTRY, index };
}

export function setActiveContent(activeContent: ActiveContentOption) : ISetActiveContentAction
{
    return { type: SET_ACTIVE_CONTENT, activeContent };
}

export function loadDailyBibleVersesSuccess(entries: IStoreEntry[]) : ILoadDailyBibleVersesSuccess
{
    return { type: LOAD_DBVDATA_SUCCESS, entries }
}
