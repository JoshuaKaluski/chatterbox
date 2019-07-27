import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper/index';
import Box from '@material-ui/core/Box/index';
import Grid from '@material-ui/core/Grid/index';
import Button from '@material-ui/core/Button/index';
import TextField from '@material-ui/core/TextField/index';
import {makeStyles} from "@material-ui/core/styles/index";
import io from 'socket.io-client';
import {Typography} from "@material-ui/core/index";

import Messages from './Messages';
import Input from './Input';

const ENDPOINT = 'http://localhost:5000';

var socket;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 'auto',
    justifyContent: 'space-between'
  }

}));

const Chat = () => {
  const [testMessages, setTestMessages] = useState([
    {
      incoming: true,
      message: 'Hello mate'
    },
    {
      incoming: false,
      message: 'Hola, just finished mowing the lawn'
    },
    {
      incoming: true,
      message: 'Wow, that sucks...'
    },
    {
      incoming: false,
      message: 'Wow this is going to be a super long message to see if everything wraps properly!'
    }
  ]);

  const addMessage = message => {
    let newMessage = {
      incoming: false,
      message
    };

    setTestMessages([...testMessages, newMessage]);
  };

  const classes = useStyles();

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on('connection', (socket) => {
      console.log('Connected');
      socket.on('disconnect', () => console.log('Disconnected'))
    })
  }, []);

  return (
    <Box m={2}>
      <Paper className={classes.root}>
        <Messages messages={testMessages}/>
        <Input addMessage={addMessage}/>
      </Paper>
    </Box>
  )
};

export {Chat, socket}