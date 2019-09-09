import React from 'react';
import Grid from '@material-ui/core/Grid'
import {makeStyles} from "@material-ui/styles";

import Header from './Header';
import Description from './Description';
import UserForm from './UserForm';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    padding: '3em'
  }
});

function Landing(props) {
  const classes = useStyles();
  return (
    <>
      <Grid className={classes.root} container direction='column' justify='center' alignItems='center'>
        <Grid className={classes.header} item component={Header} xs={12}/>
        <Grid className={classes.description} item component={Description} xs={12}/>
        <UserForm className={classes.form} register={props.register} getAvatars={props.getAvatars}/>
      </Grid>
    </>
  )
}

export default Landing;