import { IStore } from "./Models";
import { initialState } from "./Initial";
import { ISetSelectionAction, ILoadDataSuccessAction, SET_SELECTION, LOAD_DATA_SUCCESS } from "./Actions";

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
        default:
            return state;
    }
}
