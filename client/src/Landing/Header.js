import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
  header: {
    textAlign: 'center'
  }
});

function Header() {
  const classes = useStyles();
  return (
    <Typography className={classes.header} variant="h2" gutterBottom>Welcome to Chatterbox</Typography>
  )
}

export default Header;