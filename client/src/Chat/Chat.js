import React, {useEffect} from 'react';
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

const testMessages = [
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
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '15em',
    justifyContent: 'space-between'
  }

}));

const Chat = () => {
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
        <Input/>
      </Paper>
    </Box>
  )
};

export {Chat, socket}