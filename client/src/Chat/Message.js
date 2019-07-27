import React from 'react';
import {Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: props => props.incoming ? 'flex-start' : 'flex-end'
  },
  message: {
    display: 'flex',
    width: '45%',
    backgroundColor: props => props.incoming ? 'steelblue' : 'lightgreen',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  incoming: {
    alignItems: 'flex-end'
  }
}));

const Message = (props) => {
  const {message, incoming} = props;
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Paper className={classes.message}>
        <Typography variant='body1'>{message}</Typography>
      </Paper>
    </div>

  )
};


export default Message;