// eslint-disable-next-line no-undef
const socket = io();
const messageInput = document.getElementsByClassName('message-input');
const sent = document.getElementsByClassName('sent');
const name = document.getElementById('name');
const inputContainer = document.getElementsByClassName('input-container');

const sendMessage = (message) => {
  socket.emit('newMessage', { message });
};

const handleMessageNotif = (data) => {
  const { message, nickname } = data;
  name.value = nickname;
  console.log(` ${nickname}: ${message}`);
};
function setNickname(nickname) {
  socket.emit('setNickname', { nickname });
}

socket.on('messageNotif', handleMessageNotif);
