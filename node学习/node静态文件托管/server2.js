const http = require('http');
const url = require('url');
const ejs = require('ejs');
http.createServer(function (req, res) {
  res.writeHead(200, {
    "Content-Type": "text/html;charset=utf-8"
  });
  let pathname = url.parse(req.url).pathname; // 后缀名
  console.log('pathname: ', pathname);
  if (pathname == '/login') {
    let arr = '后台数据';
    let s = '<h4>2141</h4>';
    let list = [
      '1313123', '222313', '34214214'
    ]
    ejs.renderFile('view/login.ejs', {
      msg: arr,
      list: list,
      msg: s
    }, (err, data) => {
      res.end(data)
    })
  }
}).listen(8001);
