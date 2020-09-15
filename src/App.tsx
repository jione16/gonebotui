import React from 'react';
import './App.css';
import Chat from './components/chat/Chat';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

function App() {
  return (
    <Router>
    <div className="App">
      <div className="container">
        <Chat />
        <hr />
      </div>
        <Switch>
          <Route exact path="/bcompare">
            {<h1>becompare</h1>}
          </Route>
        </Switch>
    </div>
    </Router>
  );
}

export default App;
