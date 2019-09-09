import React, {useEffect, useState} from 'react';
import {
  Card,
  Avatar,
  TextField,
  Button,
  CardContent,
  CardActions,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar, ListItemText
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import Dialog from "@material-ui/core/Dialog";
import AvatarDialog from "./AvatarDialog";



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

function UserForm(props) {
  const [state, setState] = useState({
    avatar: null,
    name: ''
  });
  const [open, setOpen] = useState(false);
  const [avatars, setAvatars] = useState(() => {
    props.getAvatars((error, avatars) => {
      console.log(typeof avatars);
      console.log(avatars);
      setAvatars(avatars);
    });
  });

  const onChange = e => {
    setState({...state, [e.target.name]: e.target.value});
  };

  const openDialog = () => {
    console.log(avatars);
    setOpen(true);
  };

  const handleSelection = value => {
    setOpen(false);
    setState({...state, avatar: value});
  };

  const classes = useStyles();

  return (
    <>
      <form>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            {(state.avatar === null) ?
              <Avatar className={classes.avatar} onClick={() => openDialog()}>Pick an Avatar</Avatar>
              :
              <Avatar className={classes.avatar} alt={state.avatar.name} src={state.avatar.image} onClick={() => openDialog()} />
            }
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
      <AvatarDialog onClose={handleSelection} open={open} avatars={avatars}/>
    </>
  )
}

export default UserForm;