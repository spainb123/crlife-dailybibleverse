import React, { Component } from 'react';
import { Provider } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import ContentView from './components/ContentView/ContentView';
import NavigationView from './components/NavigationView/NavigationView';
import { createStore } from 'redux';
import rootReducer from './store/Reducers';
import { Container, Row, Col } from 'reactstrap';

class App extends Component {

  private store = createStore(rootReducer);

  render() {
    return (
      <Provider store={this.store}>
        <div className="App">
          <Container>
            <Row>
              <Col xs="3">
                <NavigationView></NavigationView>
              </Col>
              <Col xs="9">
                <ContentView></ContentView>
              </Col>
            </Row>
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
