const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

io.sockets.on('connection', (socket) => {
  console.log('A user connected with id: ' + socket.id);
  socket.on('chat message', (message) => {
    console.log(message);
    socket.emit('chat message', message)
  });
  socket.on('disconnect', () => console.log('User disconnected.'))
});

http.listen(PORT, () => console.log(`Server started on port ${PORT}...`));