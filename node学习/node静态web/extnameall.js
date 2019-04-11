const fs = require('fs');
exports.getMine = function (extname) {
  console.log('extname: ', extname);
  // fs.readFile('./mime.json', (err, data) => {
  //   if (err) {
  //     console.log('json不存在')
  //     return;
  //   }
  //   let Mimes = JSON.parse(data.toString());
  //   return Mimes[extname] || 'text/html';
  // })
  let data = fs.readFileSync('./mime.json');
  let Mimes = JSON.parse(data.toString());
  return Mimes[extname] || 'text/html';
}
