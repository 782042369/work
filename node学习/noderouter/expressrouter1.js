const http = require('http');
const url = require('url');
const model = {};
const app = function (req, res) {
  let pathname = url.parse(req.url).pathname;
  if (pathname !== '/favicon.ico') {
    if (!pathname.endsWith('/')) {
      pathname = pathname + '/';
    }
    if (model[pathname]) {
      console.log('string: ', pathname);
      model[pathname](req, res);
    } else {
      res.end('no')
    }
  }
}
// 定义
app.get = function (string, callback) {
  // 注册
  if (!string.endsWith('/')) {
    string = string + '/';
  }
  if (!string.startsWith('/')) {
    string = '/' + string;
  }
  model[string] = callback;
  console.log('model: ', model);
}
http.createServer(app).listen(3000);
// 执行
app.get('/login', (req, res) => {
  res.end('login')
})

app.get('/register', (req, res) => {
  res.end('register')
})
