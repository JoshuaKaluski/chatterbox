import React from 'react';
import {Card, CardMedia} from "@material-ui/core";

function ChatroomCard({chatroom}) {
  return (
    <Card>
      <CardMedia
        image={chatroom.image}
      />
    </Card>
  )
}

export default ChatroomCard;