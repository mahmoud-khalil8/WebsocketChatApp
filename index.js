const express = require('express');
const path = require('path');
const socketIo = require('socket.io');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
  res.render('index');
});
app.listen(3000);
