const url = require('url');
// 改变res send
function changeRes(res) {
  res.send = function (data) {
    res.writeHead(200, {
      "Content-Type": "text/html;charset=utf-8"
    });
    res.end(data);
  }
}
const SERVER = function () {
  const MODEL = {};
  MODEL._get = {};
  MODEL._post = {};
  const app = function (req, res) {
    changeRes(res);
    let pathname = url.parse(req.url).pathname;
    let method = req.method.toLowerCase();
    if (pathname !== '/favicon.ico') {
      if (!pathname.endsWith('/')) {
        pathname = pathname + '/';
      }
      if (MODEL['_' + method][pathname]) {
        if (method === 'post') {
          let postdata = '';
          req.on('data', (chunk) => {
            postdata += chunk;
          })
          req.on('data', (err, chunk) => {
            req.body = postdata;
            MODEL['_' + method][pathname](req, res);
          })
        } else {
          MODEL['_' + method][pathname](req, res);
        }
      } else {
        res.end('no')
      }
    }
  }
  app.get = function (string, callback) {
    // 注册
    if (!string.endsWith('/')) {
      string = string + '/';
    }
    if (!string.startsWith('/')) {
      string = '/' + string;
    }
    MODEL._get[string] = callback;
  }
  app.post = function (string, callback) {
    // 注册
    if (!string.endsWith('/')) {
      string = string + '/';
    }
    if (!string.startsWith('/')) {
      string = '/' + string;
    }
    MODEL._post[string] = callback;
  }
  return app;
}

module.exports = SERVER();
