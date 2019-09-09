import React, {useState} from 'react';
import {Card, Avatar, TextField, Button, CardContent, CardActions} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '3em',
    boxShadow: '0px 15px 35px -5px rgba(50, 88, 130, 0.32)',
    padding: '1em',
    overflow: 'visible',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    width: '150px',
    height: '150px',
    top: '-100px',
  },
  input: {
    top: '-60px'
  }
});

function UserForm() {
  const [state, setState] = useState({
    image: '',
    name: ''
  });

  const onChange = e => {
    setState({...state, [e.target.name]: e.target.value});
  };

  const classes = useStyles();

  return (
    <form>
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Avatar className={classes.avatar}>Pick an Avatar</Avatar>
          <TextField
            className={classes.input}
            id="name"
            name="name"
            label="Name"
            margin="normal"
            variant="outlined"
            value={state.name}
            onChange={onChange}
          />
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" type="submit">Create User</Button>
        </CardActions>
      </Card>
    </form>
  )
}

export default UserForm;