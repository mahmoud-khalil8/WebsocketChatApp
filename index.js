const express = require('express');
const path = require('path');
const app = express();
const httpServer = require('http').createServer(app);

const server = app.listen(3000, () => {
  console.log('listening on port 3000');
});

const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'src/')));

io.on('connection', (socket) => {
  socket.on('newMessage', ({ message, name }) => {
    io.emit('messageNotif', {
      message,
      nickname: name || 'anonymous',
    });
  });

  socket.on('setNickname', ({ nickname }) => {
    socket.nickname = nickname;
  });
});
