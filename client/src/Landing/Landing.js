import React from 'react';
import Grid from '@material-ui/core/Grid'

import Header from './Header';
import Description from './Description';
import UserForm from './UserForm';

function Landing(props) {

  return (
    <div>
      <Grid container direction='column' justify='center' alignItems='center'>
        <Grid item component={Header} xs={12}/>
        <Grid item component={Description} xs={12}/>
        <UserForm />
      </Grid>
    </div>
  )
}

export default Landing;