import React, {useState} from 'react';
import {Card, Avatar, TextField} from "@material-ui/core";

function UserForm() {
  const [state, setState] = useState({
    avatar: '',
    name: ''
  });


  return (
    <form>
      <Card>
        <Avatar>Pick an Avatar</Avatar>
        <TextField
          id="name"
          name="name"
          label="Name"
          margin="normal"
          variant="outlined"
        />
      </Card>
    </form>
  )
}

export default UserForm;