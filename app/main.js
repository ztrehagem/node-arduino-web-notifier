const HttpServer = require('./server');
const SocketServer = require('./socket');
const SerialReceiver = require('./serial-receiver');

var portName = process.argv[2];

if (!portName) {
  console.log('usage: npm run start <portName>');
  console.log('portName: like "/dev/cu.usbmodem14431" (MacOS)');
  process.exit();
}

var httpServer = HttpServer.init();
var socketServer = SocketServer.init(httpServer);
var serialReceiver = new SerialReceiver(portName, socketServer);
httpServer.listen(8080);
