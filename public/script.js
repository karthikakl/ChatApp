const socket = io('http://localhost:4000');

const messagesDiv = document.getElementById('messages');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message');

// Listen for messages from the server
socket.on('chat message', (msg) => {
  const messageElement = document.createElement('div');
  messageElement.textContent = msg.text;

  // Apply different styles based on the sender
  if (msg.sender === socket.id) {
    messageElement.classList.add('sent'); //right
  } else {
    messageElement.classList.add('received');  //left
  }

  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

// Handle form submission
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;

  // Emit the message with a sender type
  socket.emit('chat message', { text: message, sender: 'user' });
  messageInput.value = '';
});
