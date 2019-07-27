import React, {useEffect} from 'react';
import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:5000';

var socket;
const Chat = () => {

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on('connection', (socket) => {
      console.log('Connected');
      socket.on('disconnect', () => console.log('Disconnected'))
    })
  }, []);
  return (
    <div>
      <h1>Chat</h1>
    </div>
  )
};

export {Chat, socket}