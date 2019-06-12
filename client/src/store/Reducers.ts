import { IStore } from "./Models";
import { initialState } from "./Initial";
import { ISetSelectionAction, ILoadDataSuccessAction, SET_SELECTION, LOAD_DATA_SUCCESS, TOGGLE_FOOTER } from "./Actions";

export default function rootReducer(
    state: IStore = initialState,
    action: ISetSelectionAction | ILoadDataSuccessAction)
{
    switch(action.type)
    {
        case SET_SELECTION:
            return {...state, ...{ selection: (<ISetSelectionAction>action).selection }};
        case LOAD_DATA_SUCCESS:
            return {...state, ...{ data: (<ILoadDataSuccessAction>action).data }};
        case TOGGLE_FOOTER:
            return {...state, ...{ footerExpanded: !state.footerExpanded }};
        default:
            return state;
    }
}
