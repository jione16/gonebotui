import React from 'react';
import './App.css';
import Chat from './components/chat/Chat';
import BeyondCompare from './components/beyondcompare/BeyondCompare'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Putty from './components/putty/Putty';

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
            <BeyondCompare />
          </Route>
          <Route exact path="/putty">
            <Putty/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
