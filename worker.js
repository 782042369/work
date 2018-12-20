// var http = require('http');
// http.createServer(function (req, res) {
//   res.writeHead(200, {
//     'Content-Type': 'text/plain'
//   });
//   res.end('Hello World\n');
// }).listen(Math.round((1 + Math.random()) * 1000), '127.0.0.1');

// var http = require('http');
// http.createServer(function (req, res) {
//   res.writeHead(200, {
//     'Content-Type': 'text/plain'
//   });
//   res.end('Hello World\n');
// }).listen(8888, '127.0.0.1');
var http = require('http');
var server = http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.end('handled by child, pid is ' + process.pid + '\n');
});
var worker;
process.on('message', function (m, tcp) {
  if (m === 'server') {
    worker = tcp;
    worker.on('connection', function (socket) {
      server.emit('connection', socket);
    });
  }
});
process.on('uncaughtException', function () { // 停止接收新的连接
  worker.close(function () {
    // 所有已有连接断开后，退出进程
    process.exit(1);
  });
});
let arr = '/(?=(?!^)(\d{3})+$)/g'
