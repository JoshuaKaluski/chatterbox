import React, {useState} from 'react';
import {Card, Avatar, TextField, Button, CardContent, CardActions} from "@material-ui/core";


function UserForm() {
  const [state, setState] = useState({
    image: '',
    name: ''
  });

  const onChange = e => {
    setState({...state, [e.target.name]: e.target.value});
  };

  return (
    <form>
      <Card>
        <CardContent>
          <Avatar style={{width: 150, height: 150}}>Pick an Avatar</Avatar>
          <TextField
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