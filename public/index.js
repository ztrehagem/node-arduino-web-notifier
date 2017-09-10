function initSocket(socket) {
  // catch the 'greeting' event from server
  socket.on('greeting', (data) => console.log(data));

  // catch the 'message-from-arduino' event from server
  socket.on('message-from-arduino', (str) => console.log(str));

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
