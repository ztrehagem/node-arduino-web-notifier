const SerialPort = require('serialport');

const port = new SerialPort('/dev/cu.usbmodem14311', {
  baudRate: 9600,
});

port.on('data', (data) => {
  const str = data.toString();
  console.log(str);
});
