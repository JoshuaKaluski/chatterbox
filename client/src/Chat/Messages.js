import React from 'react';
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core";

import Message from './Message';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  }
}));

const Messages = (props) => {
  const {messages} = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {messages.map(message => (
        <Message key={message.message} incoming={message.incoming} message={message.message} />
      ))}
    </div>
  )
};

export default Messages;