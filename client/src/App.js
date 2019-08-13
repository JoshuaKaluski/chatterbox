import React, {useState, useEffect} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import Landing from './Landing';
import socket from './socket';

function App() {
  //State
  const [state, setState] = useState({
    user: null,
    registerInProcess: false,
    client: socket(),
    chatrooms: null
  });

  //Get all chatrooms when first loaded
  useEffect(() => getChatrooms(), []);

  const onEnterChatroom = (chatroomName, noUser, success) => {
    if (!state.user) {
      return noUser();
    }

    return state.client.join(chatroomName, (err, chatLog) => {
      if (err) return console.error(err);

      return success(chatLog);
    })
  };

  const onLeaveChatroom = (chatroomName, success) => {
    state.client.leave(chatroomName, err => {
      if (err) return console.error(err);
      return success();
    })
  };

  const getChatrooms = () => state.client.getChatrooms((err, chatrooms) => setState({...state, chatrooms}));

  const register = (name, avatar) => {
    //Reset registerInProcess to false
    const registerResponse = user => setState({...state, registerInProcess: false, user});

    //Register flow
    setState({...state, registerInProcess: true});
    state.client.register(name, avatar, (err, user) => {
      if (err) return registerResponse(null);
      return registerResponse(user);
    })
  };

  return (
    <MuiThemeProvider>
      <Switch>
        <Route exact path='/' render={props => (
          <Landing
            chatrooms={state.chatrooms}
          />
        )}/>
      </Switch>
    </MuiThemeProvider>
  );
}

export default App;
