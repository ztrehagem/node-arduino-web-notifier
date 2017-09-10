// -- imports -- //
const Https = require('https');
const Url = require('url');
const Utils = require('./utils');


// -- export class --//
module.exports = class SlackMessenger {
  constructor(webhookUrl) {
    this.options = Url.parse(webhookUrl);
    this.options.method = 'POST';
    this.options.headers = {
      'Content-Type': 'application/json',
    };
  }

  emit(message) {
    var request = Https.request(this.options, (response) => this.receive(response));
    var body = {
      text: message,
    };
    request.write(JSON.stringify(body));
    request.end();
  }

  receive(response) {
    var chunks = [];
    response.on('data', (chunk) => chunks.push(chunk));
    response.on('end', () => Utils.log('response from slack:', Buffer.concat(chunks).toString()));
  }
}
