import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import ContentView from './components/ContentView/ContentView';
import NavigationView from './components/NavigationView/NavigationView';
import { createStore } from 'redux';
import rootReducer from './store/Reducers';
import MockDailyBibleVerseApi from './api/MockDailyBibleVerseApi';
import { loadDailyBibleVersesSuccess } from './store/Actions';
import LandscapeLayout from './layouts/LandscapeLayout/LandscapeLayout';
import PortraitLayout from './layouts/PortraitLayout/PortraitLayout';

class App extends Component {

  private dbvApi = new MockDailyBibleVerseApi();
  private store = createStore(rootReducer);

  constructor(props: any)
  {
    super(props);

    // NOTE: A more 'redux' pattern would be to leverage redux-thunk and use actions to load data
    // https://medium.com/fullstack-academy/thunks-in-redux-the-basics-85e538a3fe60
    this.dbvApi.getDailyData().then(entries => {
      this.store.dispatch(loadDailyBibleVersesSuccess(entries))
    });
  }

  render() {
    return (
      <Provider store={this.store}>
        <div className="App">
          <LandscapeLayout />
          <PortraitLayout />
        </div>
      </Provider>
    );
  }
}

export default App;
