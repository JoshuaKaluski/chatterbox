import React, {useState} from 'react';
import PropTypes from 'prop-types'
import Dialog from "@material-ui/core/Dialog";
import {Avatar, DialogContent, DialogTitle, List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";

function AvatarDialog(props) {
  const {onClose, open, avatars} = props;

  function handleClose() {
    onClose(null);
  }
  function handleSelection(value) {
    onClose(value);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Pick your avatar</DialogTitle>
      <DialogContent>
        <List>
          {avatars.map(avatar => (
            <ListItem key={avatar} onClick={() => handleSelection(avatar)}>
              <ListItemAvatar>
                <Avatar alt={avatar.name} src={avatar.image}/>
              </ListItemAvatar>
              <ListItemText>
                {avatar.name}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  )
}

AvatarDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  avatars: PropTypes.array.isRequired
};

export default AvatarDialog;