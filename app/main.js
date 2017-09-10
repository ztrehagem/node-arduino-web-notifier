// -- imports == //
const HttpServer = require('./http-server');
const SocketServer = require('./socket-server');
const SerialReceiver = require('./serial-receiver');
const SlackMessenger = require('./slack-messenger');
const Utils = require('./utils');


// -- main -- //
var portName = process.argv[2];
var slackWebhookUrl = process.argv[3];

if (!portName) {
  console.log('usage: npm run start <portName>');
  console.log('portName: like "/dev/cu.usbmodem14431" (MacOS)');
  process.exit();
}

var httpServer = HttpServer.create();
var socketServer = SocketServer.create(httpServer);
var serialReceiver = new SerialReceiver(portName, socketServer);

serialReceiver.on('message', (message) => sendToSocket(message));

if (slackWebhookUrl) {
  var slackMessenger = new SlackMessenger(slackWebhookUrl);
  serialReceiver.on('message', (message) => sendToSlack(message));
}

httpServer.listen(8080);


// -- functinos -- //
function sendToSocket(message) {
  socketServer.emit('message-from-arduino', message);
  Utils.log('emitted to socket:', message);
}

function sendToSlack(message) {
  slackMessenger.emit(message);
  Utils.log('emitted to slack:', message);
}
