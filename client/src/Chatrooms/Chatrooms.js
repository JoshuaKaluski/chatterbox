import React from 'react';
import {Grid} from "@material-ui/core";

import ChatroomCard from './ChatroomCard';

function Chatrooms(props) {
  const {chatrooms} = props;

  return (
    <Grid container spacing={3}>
      {chatrooms.map(chatroom => (
        <Grid item xs={6} md={4} lg={3}>
          <ChatroomCard/>
        </Grid>
      ))}
    </Grid>
  )
}

export default Chatrooms;