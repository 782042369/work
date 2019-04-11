const http = require('http');
const url = require('url');
const routermode = require('./model/model.js');
http.createServer(function (req, res) {
  res.writeHead(200, {
    "Content-Type": "text/html;charset=utf-8"
  });
  let pathname = url.parse(req.url, true).pathname.replace('/', ''); // 后缀名
  if (pathname !== '/favicon.ico') {
    try {
      routermode[pathname](req, res);
    } catch (error) {
      routermode['index'](req, res);
    }
  }
}).listen(8001);
