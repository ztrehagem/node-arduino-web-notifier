// -- imports -- //
const Http = require('http');
const Path = require('path');
const HttpStatus = require('http-status');
const Utils = require('./utils');


// -- exports -- //
exports.createServer = createServer;


// -- functions -- //
async function deliverFile(request, response) {
  var filename = request.url + (request.url.endsWith('/') ? 'index.html' : '');
  var filepath = Path.join(__dirname, 'public', filename);
  var file = await Utils.getFile(filepath);

  if (!file) {
    response.writeHead(HttpStatus.NOT_FOUND);
    response.end();
    Utils.log('not found >>', filename);
  } else {
    response.writeHead(HttpStatus.OK);
    response.write(file);
    response.end();
    Utils.log('delivered >>', filename)
  }
}

function onRequest(request, response) {
  Utils.log('requested url >>', request.url);

  request.on('data', (chunk) => Utils.log('received chunk >>', chunk.toString()));
  request.on('end', () => deliverFile(request, response));
}

function createServer() {
  return Http.createServer((request, response) => onRequest(request, response));
}
