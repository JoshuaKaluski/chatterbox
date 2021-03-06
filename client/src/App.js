import React, {useState, useEffect} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import Landing from './Landing/Landing';
import Chatrooms from './Chatrooms/Chatrooms';
import socket from './socket';

import useToggle from './hooks/useToggle';

function App() {
  //State
  const [user, setUser] = useState(null);
  const [registerInProgress, toggleRegisterInProgress] = useToggle(false);
  const [chatrooms, setChatrooms] = useState(null);

  //Lazy initial state prevents multiple sockets being created
  const [client, setClient] = useState(() => {
    const initialState = socket();
    return initialState
  });

  const onEnterChatroom = (chatroomName, noUser, success) => {
    if (user) {
      return noUser();
    }

    return client.join(chatroomName, (err, chatLog) => {
      if (err) return console.error(err);

      return success(chatLog);
    })
  };

  const onLeaveChatroom = (chatroomName, success) => {
    client.leave(chatroomName, err => {
      if (err) return console.error(err);
      return success();
    })
  };

  const getChatrooms = () => {
    console.log(client);
    client.getChatrooms((err, chatrooms) => {
      console.log('Getting chatrooms');
      if (err) return console.error(err);
      setChatrooms(chatrooms);
    });
  };

  const register = (name, avatar) => {
    //Reset registerInProcess to false
    const registerResponse = user => {
      setUser(user);
      toggleRegisterInProgress();
    };

    //Register flow
    toggleRegisterInProgress();
    client.register(name, avatar, (err, user) => {
      if (err) return registerResponse(null);
      return registerResponse(user);
    })
  };

  const chatroomOrRedirect = (chatroom, {history}) => {
    const {chatLog} = history.location.state;

    if (!user) {
      return <Redirect to='/' />
    } else {
      //TODO render individual chatroom
      return <div />
    }
  };

  const chatroomRoutes = chatrooms => {
    if (chatrooms !== null) {
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

  //Get all chatrooms when first loaded
  useEffect(() => {
    getChatrooms();
  }, []);

  return (
    <MuiThemeProvider>
      <Switch>
        <Route exact path='/' render={props => (
          <Landing
            register={register}
            getAvatars={client.getAvatars}
          />
        )}/>
        <Route
          exact path='/chatrooms'
          render={props => (
            <Chatrooms
              chatrooms={chatrooms}
              user={user}
              onEnterChatroom={chatroomName => onEnterChatroom(
                chatroomName,
                () => props.history.push('/'),
                chatLog => props.history.push(chatroomName, {chatLog})
              )}
            />
          )}
        />
      </Switch>
    </MuiThemeProvider>
  );
}

export default App;
