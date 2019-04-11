const http = require('http');
const url = require('url');
http.createServer(function (req, res) {
  let pathname = url.parse(req.url).pathname; // 后缀名
  console.log('pathname: ', pathname);
  res.end(pathname)
}).listen(8001);
