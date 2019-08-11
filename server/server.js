const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

const ClientManager = require('./ClientManager');
const ChatroomManager = require('./ChatroomManager');
const makeHandlers = require('./handlers');

const clientManager = ClientManager();
const chatroomManager = ChatroomManager();

io.sockets.on('connection', client => {
  const {
    handleRegister,
    handleJoin,
    handleLeave,
    handleMessage,
    handleGetChatrooms,
    handleDisconnect
  } = makeHandlers(client, clientManager, chatroomManager);

  console.log('A user connected with id: ' + client.id);
  clientManager.addClient(client);

  client.on('register', handleRegister);

  client.on('join', handleJoin);

  client.on('leave', handleLeave);

  client.on('message', handleMessage);

  client.on('chatrooms', handleGetChatrooms);

  client.on('disconnect', () => {
    console.log(`User ${client.id} disconnected`);
    handleDisconnect();
  });

  client.on('error', e => {
    console.log(`Received error from client: ${client.id}`);
    console.log(e);
  })
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));