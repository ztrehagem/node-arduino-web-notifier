const FileSystem = require('fs');

exports.getFile = (filepath) => new Promise((res, rej) => {
  FileSystem.readFile(filepath, (err, file) => err ? res(null) : res(file));
});

exports.now = () => {
  return '[' + new Date().toLocaleTimeString() + ']';
}

exports.log = (...args) => {
  return console.log(exports.now(), ...args);
}
