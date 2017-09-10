function nowString() {
  return new Date().toLocaleTimeString();
}

function createMessageListItem(message) {
  var eListItem = document.createElement('li');
  eListItem.innerText = '[' + nowString() + '] ' + message;
  return eListItem;
}

function displayMessage(message) {
  var eList = document.getElementById('messages');
  var eListItem = createMessageListItem(message);
  eList.appendChild(eListItem);
}

function initSocket(socket) {
  // catch the 'greeting' event from server
  socket.on('greeting', (data) => console.log(data));

  // catch the 'message-from-arduino' event from server
  socket.on('message-from-arduino', (message) => displayMessage(message));

  // send the 'echo' event with text 'test1234' to server
  // and catch the response
  socket.emit('echo', 'test1234', (response) => {
    console.log(response);
  });
}

function onLoad() {
  // create client side socket
  var socket = io();

  // initialize client side socket when connect to server successfully
  socket.on('connect', () => initSocket(socket));
}

window.addEventListener('load', () => onLoad());
