const http = require('http');
const Router = require('./router');
http.createServer(function (req, res) {
  Router.router(req, res, 'static')
  console.log('req: ', req.url);
}).listen(8001);
