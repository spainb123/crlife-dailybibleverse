import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import ContentView from './components/ContentView/ContentView';
import NavigationView from './components/NavigationView/NavigationView';
import { createStore } from 'redux';
import rootReducer from './store/Reducers';
import { Container, Row, Col } from 'reactstrap';
import PaginationView from './components/PaginationView/PaginationView';

class App extends Component {

  private store = createStore(rootReducer);

  render() {
    return (
      <Provider store={this.store}>
        <div className="App">
          <Container className="Landscape">
            <Row>
              <Col xs="3" className="NavViewCol">
                <NavigationView></NavigationView>
              </Col>
              <Col xs="9">
                <ContentView/>
              </Col>
            </Row>
          </Container>
          <Container className="Portrait">
            <Row>
              <Col>
                <ContentView/>
              </Col>
            </Row>
            <div className="PageNav">
              <PaginationView />
            </div>
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
