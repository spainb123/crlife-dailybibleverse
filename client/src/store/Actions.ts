import IReadingData from "./IReadingData";
import { Selection } from "./Models";

export const SET_SELECTION = 'SET_SELECTION';
export const LOAD_DATA_SUCCESS = 'LOAD_DATA_SUCCESS';

export interface IAction
{
    type: string
}

export interface ISetSelectionAction extends IAction
{
    selection: Selection
}

export interface ILoadDataSuccessAction extends IAction
{
    data: IReadingData
}

export function setSelection(selection: Selection)
{
    return { type: SET_SELECTION, selection}
}

export function loadDataSuccess(data: IReadingData)
{
    return { type: LOAD_DATA_SUCCESS, data }
}