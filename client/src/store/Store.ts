import { createStore } from 'redux';
import { IStore } from './Models';
import rootReducer from './Reducers';

export default function configureStore(initialState: IStore)
{
    return createStore(
        rootReducer,
        initialState
    );
}