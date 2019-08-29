import io from 'socket.io-client';
const ENDPOINT = 'ws://localhost:5000';

export default () => {
  const socket = io(ENDPOINT, {transports: ['websocket']});
  console.log(socket);

  const registerHandler = onMessageReceived => socket.on('message', onMessageReceived);

  const unregisterHandler = () => socket.off('message');

  //Need to check if works
  const register = (name, avatar, callback) => socket.emit('register', {name, avatar}, callback);

  const join = (chatroomName, callback) => socket.emit('join', chatroomName, callback);

  const leave = (chatroomName, callback) => socket.emit('leave', chatroomName, callback);

  const message = (chatroomName, message, callback) => socket.emit('message', {chatroomName, message}, callback);

  const getChatrooms = callback => socket.emit('chatrooms', null, callback);

  socket.on('error', err => console.log(`Received socket error: ${err}`));

  return {
    register,
    join,
    leave,
    message,
    getChatrooms,
    registerHandler,
    unregisterHandler
  }
}