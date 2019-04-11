var http = require('http');
var str = require('./config');
let app = http.createServer(function (req, res) {
  res.writeHead(200, {
    "Content-Type": "text/html;charset=utf-8"
  });
  if (req.url != '/favicon.ico') {
    str.sayhello();
    str.add(1, 4);
  }
  res.write('你好 nodejs');
  res.end();
})
app.listen(8001, '127.0.0.1');
