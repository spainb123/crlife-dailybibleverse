import { IStore } from "./Models";
import { ISetActiveEntryAction, ISetActiveContentAction, SET_ACTIVE_ENTRY, SET_ACTIVE_CONTENT, LOAD_DBVDATA_SUCCESS, ILoadDailyBibleVersesSuccess } from "./Actions";
import { initialState } from "./Initial";

export default function rootReducer(
    state : IStore = initialState, 
    action: ISetActiveEntryAction | ISetActiveContentAction | ILoadDailyBibleVersesSuccess)
{
    switch(action.type)
    {
        case SET_ACTIVE_ENTRY:
            return {...state, ...{ activeEntry: (<ISetActiveEntryAction>action).index }};
        case SET_ACTIVE_CONTENT:
            return {...state, ...{ activeContent: (<ISetActiveContentAction>action).activeContent }}
        case LOAD_DBVDATA_SUCCESS:
            return {...state, ...{ loading: false, entries: (<ILoadDailyBibleVersesSuccess>action).entries }}
        default:
            return state;
    }
}