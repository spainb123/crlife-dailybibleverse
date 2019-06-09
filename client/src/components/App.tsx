import * as React from 'react';
import PortraitLayout from './PortraitLayout';
import IReadingData from '../store/IReadingData';
import rootReducer from '../store/Reducers';
import { createStore } from 'redux';
import { loadDataSuccess } from '../store/Actions';
import { Provider } from 'react-redux';

export interface AppProps { data: IReadingData}

export class App extends React.Component<AppProps, {}> {

    private store = createStore(rootReducer);

    constructor(props: AppProps)
    {
        super(props);

        this.store.dispatch(loadDataSuccess(props.data));
    }

    render() {

        const data = this.props.data;

        return (
            <Provider store={this.store}>
                <PortraitLayout />
            </Provider>
        );
    }
}