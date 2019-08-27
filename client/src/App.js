import React, {useState, useEffect} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import Landing from './Landing/Landing';
import Chatrooms from './Chatrooms/Chatrooms';
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
  useEffect(() => {
    getChatrooms();
    console.log('loaded chatrooms');
  }, []);

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

  const getChatrooms = () => state.client.getChatrooms((err, chatrooms) => {
    console.log(err);
    setState({...state, chatrooms});
    console.log(chatrooms);
  });

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

  const chatroomOrRedirect = (chatroom, {history}) => {
    const {chatLog} = history.location.state;

    if (!state.user) {
      return <Redirect to='/' />
    } else {
      //TODO render individual chatroom
      return <div />
    }
  };

  const chatroomRoutes = chatrooms => {
    if (chatrooms) {
      return chatrooms.map(chatroom => (
        <Route
          key={chatroom.name}
          exact path={`/${chatroom.name}`}
          render={props => chatroomOrRedirect(chatroom, props)}
        />
      ))
    } else {
      console.log('No chatrooms...')
    }
  };

  return (
    <MuiThemeProvider>
      <Switch>
        <Route exact path='/' render={props => (
          <Landing
            register={register}
          />
        )}/>
        <Route
          exact path='/chatrooms'
          render={props => (
            <Chatrooms
              chatrooms={state.chatrooms}
              user={state.user}
              onEnterChatroom={chatroomName => onEnterChatroom(
                chatroomName,
                () => props.history.push('/'),
                chatLog => props.history.push(chatroomName, {chatLog})
              )}
            />
          )}
        />
        {
          chatroomRoutes(state.chatrooms)
        }
      </Switch>
    </MuiThemeProvider>
  );
}

export default App;
