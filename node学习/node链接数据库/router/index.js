const fs = require('fs');
const path = require('path');
const url = require('url');
const MimeModel = require('./extnameall');
exports.router = function (req, res, staticname) {
  console.log('staticname: ', staticname);
  res.writeHead(200, {
    "Content-Type": "text/html;charset=utf-8"
  });
  let pathname = url.parse(req.url).pathname; // 后缀名
  if (pathname === '/') {
    pathname = '/index.html'
  }
  let extname = path.extname(pathname);
  if (pathname !== '/favicon.ico') {
    fs.readFile(staticname + '/' + pathname, (err, data) => {
      if (err) { // 读取不到
        fs.readFile(staticname + '/404.html', (err, data) => {
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
}
