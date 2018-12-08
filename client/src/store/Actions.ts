import { ActiveContentOption } from "./Models";

export const SET_ACTIVE_ENTRY = 'SET_ACTIVE_ENTRY';
export const SET_ACTIVE_CONTENT = 'SET_ACTIVE_CONTENT';

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

export function setActiveEntry(index: number) : ISetActiveEntryAction
{
    return { type: SET_ACTIVE_ENTRY, index };
}

export function setActiveContent(activeContent: ActiveContentOption) : ISetActiveContentAction
{
    return { type: SET_ACTIVE_CONTENT, activeContent };
}
