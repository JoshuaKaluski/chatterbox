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
    margin: theme.spacing(1.5),
    width: '45%',
    backgroundColor: props => props.incoming ? 'steelblue' : 'lightgreen',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  text: {
    padding: theme.spacing(1)
  }
}));

const Message = (props) => {
  const {message, incoming} = props;
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Paper className={classes.message}>
        <Typography className={classes.text} variant='body1'>{message}</Typography>
      </Paper>
    </div>

  )
};


export default Message;