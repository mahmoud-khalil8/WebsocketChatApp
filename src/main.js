const socket = io('/');

const messageInput = document.querySelector('.message-input');
const inputContainer = document.querySelector('.input-container');
const nameInput = document.querySelector('.name');

inputContainer.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  const name = nameInput.value.trim();

  if (message !== '') {
    sendMessage(message, name);

    messageInput.value = '';
  }
});

let flag = 0;
const sendMessage = (message, name) => {
  flag = 1;
  socket.emit('newMessage', { message, name });
};
function setNickname(nickname) {
  socket.emit('setNickname', { nickname });
}

const handleMessageNotif = (data) => {
  const { message, nickname } = data;
  console.log(nickname, message);

  const messageContainer = document.querySelector('.message-container');

  const messageBubble = document.createElement('p');
  messageBubble.textContent = message;

  if (flag === 1) {
    const sentContainer = document.createElement('div');
    sentContainer.classList.add('sent');
    const sentBubble = document.createElement('p');
    sentBubble.classList.add('sent-bubble');
    sentBubble.textContent = message;
    sentContainer.appendChild(sentBubble);
    messageContainer.appendChild(sentContainer);
    flag = 0;
  } else {
    const receivedContainer = document.createElement('div');
    receivedContainer.classList.add('received');
    const receivedBubble = document.createElement('p');
    receivedBubble.classList.add('received-bubble');
    receivedBubble.textContent = `${nickname}: ${message}`;
    receivedContainer.appendChild(receivedBubble);
    messageContainer.appendChild(receivedContainer);
  }
};

socket.on('messageNotif', handleMessageNotif);
