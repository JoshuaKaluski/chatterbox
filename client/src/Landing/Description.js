import React from 'react';
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
  text: {
    marginBottom: '2em'
  }
});

function Description() {
  const classes = useStyles();
  return (
    <Typography className={classes.text} variant="body1" gutterBottom>
      Chatterbox is a messaging application to connect fans of a certain fandom together in a chatroom.
      It currently features 5 chatrooms for various fandoms. Create a user below to get started!
    </Typography>
  )
}

export default Description;