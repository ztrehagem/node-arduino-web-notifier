// -- imports -- //
const SerialPort = require('serialport');
const Utils = require('./utils');

// -- class -- //
module.exports = class SerialReceiver {
  constructor(portName, socketServer) {
    this.port = new SerialPort(portName, { baudRate: 9600 });
    this.socketServer = socketServer;
    this.buf = new Buffer(0);

    this.port.on('data', (data) => this.receive(data));
  }

  receive(data) {
    Utils.log('arduino says:', data.toString());
    this.pushBuf(data);
    this.checkBuf();
  }

  pushBuf(buf) {
    this.buf = Buffer.concat([this.buf, buf]);
  }

  checkBuf() {
    if (this.buf.length >= 3) {
      var sendData = this.shiftBuf(3);
      this.emitToClient(sendData);
    }
  }

  shiftBuf(length) {
    var data = this.buf.slice(0, length);
    this.buf = this.buf.slice(length);
    return data;
  }

  emitToClient(sendData) {
    var str = sendData.toString();
    this.socketServer.emit('message-from-arduino', str);
    Utils.log('emitted to client:', str);
  }
}
