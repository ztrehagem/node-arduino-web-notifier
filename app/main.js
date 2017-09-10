// -- imports == //
const HttpServer = require('./server');
const SocketServer = require('./socket');
const SerialReceiver = require('./serial-receiver');
const Utils = require('./utils');


// -- main -- //
var portName = process.argv[2];

if (!portName) {
  console.log('usage: npm run start <portName>');
  console.log('portName: like "/dev/cu.usbmodem14431" (MacOS)');
  process.exit();
}

var httpServer = HttpServer.init();
var socketServer = SocketServer.init(httpServer);
var serialReceiver = new SerialReceiver(portName, socketServer);

serialReceiver.on('message', (message) => sendToSocket(message));

httpServer.listen(8080);


// -- functinos -- //
function sendToSocket(message) {
  socketServer.emit('message-from-arduino', message);
  Utils.log('emitted to socket:', message);
}
