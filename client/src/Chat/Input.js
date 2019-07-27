import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  text: {
    margin: theme.spacing(2),
    flexGrow: 1
  },
  form: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  button: {
    height: theme.spacing(4)
  }
}));

const Input = (props) => {
  const classes = useStyles();
  return (
    <form className={classes.form}>
      <div className={classes.text}>
        <TextField
          variant='outlined'
          label='Type your message'
          name='message'
          id='message'
          margin='normal'
          fullWidth
        />
      </div>
      <Button className={classes.button} type='submit' variant='contained'>Send</Button>
    </form>
  )
};

export default Input;