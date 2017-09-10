// -- imports -- //
const EventEmitter = require('events');
const SerialPort = require('serialport');
const Utils = require('./utils');

// -- export class -- //
module.exports = class SerialReceiver extends EventEmitter {
  constructor(portName) {
    super();
    
    this.port = new SerialPort(portName, { baudRate: 9600 });
    this.buf = new Buffer(0);

    this.port.on('data', (data) => this.receive(data));
  }

  receive(data) {
    Utils.log('arduino said:', data.toString());
    this.pushBuf(data);
    this.checkBuf();
  }

  pushBuf(buf) {
    this.buf = Buffer.concat([this.buf, buf]);
  }

  shiftBuf(length) {
    var data = this.buf.slice(0, length);
    this.buf = this.buf.slice(length);
    return data;
  }

  checkBuf() {
    // check whether received 3 bytes from serial port
    if (this.buf.length >= 3) {
      var str = this.shiftBuf(3).toString();
      this.emit('message', str);
    }
  }
}
