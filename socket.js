// -- imports -- //
const SocketIO = require('socket.io');


// -- exports -- //
exports.init = init;


// -- functions -- //
function initSocket(server, socket) {
  socket.emit('greeting', { hello: 'world' });
}

function init(httpServer) {
  var socketServer = SocketIO(httpServer);
  socketServer.on('connection', (socket) => initSocket(socketServer, socket));
}
