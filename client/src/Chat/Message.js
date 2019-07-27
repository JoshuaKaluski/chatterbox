import React from 'react';
import {Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex'
  },
  message: {
    width: '40%'
  }
}));

const Message = (props) => {
  const {message} = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.message}>
        <Typography variant='body1'>{message}</Typography>
      </Paper>
    </div>

  )
};


export default Message;