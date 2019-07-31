import React from 'react';
import {Switch, Route} from 'react-router-dom';
import SocketContext from './SocketContext';
import io from 'socket.io-client'
import Chat from './Chat/Chat'
import './App.css';

const ENDPOINT = 'http://localhost:5000';

const socket = io(ENDPOINT);

function App() {

  return (
    <SocketContext.Provider value={socket}>
      <div className="App">
        <h1>Welcome</h1>
        <Switch>
          <Route exact to='/' component={Chat}/>
        </Switch>
      </div>
    </SocketContext.Provider>
  );
}

export default App;
