const http = require('http');
const nodeStatic = require('node-static');
const socketIo = require('socket.io');
const HttpStatus = require('http-status');

const server = http.createServer((req, resp) => {
  // staticServer.serve(req, resp, (err, res) => {
  //   if (!err) return;
  //
  //   if (!resp.finished) {
  //     resp.writeHead(HttpStatus.INTERNAL_SERVER_ERROR);
  //     resp.end();
  //   }
  // });
  console.log('requested', req.url);
  req.on('end', () => {
    resp.writeHead(HttpStatus.NOT_FOUND, {
      'Content-Type': 'text/plain',
    });
    resp.end('hoge');
  });
});
const staticServer = new nodeStatic.Server('./public');
// const socketServer = socketIo(server);

// socketServer.on('connection', (socket) => {
//   console.log('connected');
//   // console.log('greeting!');
//   // socket.emit('greeting', 'hello!');
//   // socket.on('first', (data, cb) => {
//   //   cb('hello from server');
//   // });
// });

module.exports = server;
