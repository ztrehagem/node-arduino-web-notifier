const SerialPort = require('serialport');

const server = require('./server');
server.listen(8080);

const port = new SerialPort('/dev/cu.usbmodem14311', {
  baudRate: 9600,
});

// port.on('data', (data) => {
//   const str = data.toString();
//   console.log(str);
// });
