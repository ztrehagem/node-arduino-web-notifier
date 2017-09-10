// -- imports -- //
const SocketIO = require('socket.io');
const Utils = require('./utils');


// -- exports -- //
exports.init = init;


// -- functions -- //
function initSocket(server, socket) {
  socket.emit('greeting', 'Hello World! from server');
  socket.on('echo', (message, callback) => {
    callback(message);
  });
}

function init(httpServer) {
  var socketServer = SocketIO(httpServer);
  socketServer.on('connection', (socket) => initSocket(socketServer, socket));
  return socketServer;
}
