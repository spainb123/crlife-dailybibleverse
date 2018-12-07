import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ContentView from './components/ContentView/ContentView';
import NavigationView from './components/NavigationView/NavigationView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ContentView></ContentView>
        <NavigationView></NavigationView>
      </div>
    );
  }
}

export default App;
