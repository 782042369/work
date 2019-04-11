const http = require('http');
const sd = require('silly-datetime');
const md5 = require('md5-node');
let app = http.createServer(function (req, res) {
  res.writeHead(200, {
    "Content-Type": "text/html;charset=utf-8"
  });
  res.write('你好 nodejs');
  res.write(sd.format(new Date(), 'YYYY年MM月DD'));
  res.end();
})
app.listen(8001, '127.0.0.1');
