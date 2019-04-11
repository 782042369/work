const http = require('http');
const fs = require('fs');
const path = require('path');
const MimeModel = require('./extname');
http.createServer(function (req, res) {

  res.writeHead(200, {
    "Content-Type": "text/html;charset=utf-8"
  });
  let pathname = req.url
  if (pathname === '/') {
    pathname = 'index.html'
  }
  let extname = path.extname(pathname);
  if (pathname !== '/favicon.ico') {
    fs.readFile('static/' + pathname, (err, data) => {
      if (err) { // 读取不到
        fs.readFile('static/404.html', (err, data) => {
          res.writeHead(200, {
            "Content-Type": "text/html;charset=utf-8"
          });
          res.write(data);
          res.end(); /*结束响应*/
        })
      } else { // 读取到了
        let mimeModel = MimeModel.getMine(extname);
        res.writeHead(200, {
          "Content-Type": mimeModel + ";charset=utf-8"
        });
        res.write(data);
        res.end(); /*结束响应*/
      }
    })
  }


}).listen(8001);
