import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper/index';
import Box from '@material-ui/core/Box/index';
import {makeStyles} from "@material-ui/core/styles/index";
import SocketContext from '../SocketContext';

import Messages from './Messages';
import Input from './Input';



const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 'auto',
    justifyContent: 'space-between'
  }

}));

const Chat = (props) => {
  const {socket} = props;

  const [testMessages, setTestMessages] = useState([
    {
      message: 'Hello mate'
    },
    {
      message: 'Hola, just finished mowing the lawn'
    },
    {
      message: 'Wow, that sucks...'
    },
    {
      message: "Wow this is going to be a super long message to see if everything wraps properly! I'm just going to keep talking and talking and talking until it's long enough"
    }
  ]);

  const outgoingMessage = message => {
    let newMessage = {
      message
    };
    socket.emit('chat message', newMessage);
  };

  const addMessage = message => setTestMessages([...testMessages, message]);

  const classes = useStyles();

  useEffect(() => {
    socket.on('chat message', message => {
      addMessage(message);
    });
  }, [testMessages]);

  return (
    <Box m={2}>
      <Paper className={classes.root}>
        <Messages messages={testMessages}/>
        <Input outgoingMessage={outgoingMessage}/>
      </Paper>
    </Box>
  )
};

const ChatWithSocket = () => {
  return (
    <SocketContext.Consumer>
      {socket => <Chat socket={socket}/>}
    </SocketContext.Consumer>
  )
};

export default ChatWithSocket;