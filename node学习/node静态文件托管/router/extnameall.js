const fs = require('fs');
exports.getMine = function (extname) {
  let data = fs.readFileSync('./mime.json');
  let Mimes = JSON.parse(data.toString());
  return Mimes[extname] || 'text/html';
}
