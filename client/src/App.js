import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Chat} from './Chat/Chat'
import './App.css';

function App() {

  return (
    <div className="App">
      <h1>Welcome</h1>
      <Switch>
        <Route exact to='/' component={Chat}/>
      </Switch>
    </div>
  );
}

export default App;
