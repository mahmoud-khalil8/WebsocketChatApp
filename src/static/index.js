// eslint-disable-next-line no-undef
const socket = io('/');

const sendMessage = (message) => {
  socket.emit('newMessage', { message });
};
const handleMessageNotif = (data) => {
  const { message, nickname } = data;
  console.log(` ${nickname}: ${message}`);
};
function setNickname(nickname) {
  socket.emit('setNickname', { nickname });
}

socket.on('messageNotif', handleMessageNotif);
