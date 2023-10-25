const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const httpServer = require('http').createServer(app);
const options = {
  /* ... */
};
const io = require('socket.io')(httpServer, options);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'src/static/')));

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

app.get('/', (req, res) => {
  res.render('index');
});
httpServer.listen(3000);
