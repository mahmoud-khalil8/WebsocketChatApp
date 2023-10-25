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
  // console.log('someone connected');
  //the server is making an event (hello)

  socket.on('newMessage', ({ message }) => {
    socket.broadcast.emit('messageNotif', {
      message,
      nickname: socket.nickname || 'anonymous',
    });
  });
  socket.on('setNickname', ({ nickname }) => {
    socket.nickname = nickname;
  });
});

// app.get('/', (req, res) => {
//   res.render('main');
// });
