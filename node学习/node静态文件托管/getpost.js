const http = require('http');
const url = require('url');
const ejs = require('ejs');
http.createServer(function (req, res) {
  res.writeHead(200, {
    "Content-Type": "text/html;charset=utf-8"
  });
  let pathname = url.parse(req.url, true).pathname; // 后缀名
  let methods = req.method.toLowerCase();
  if (pathname == '/login') {
    // let arr = '后台数据';
    // let s = '<h4>2141</h4>';
    // let list = [
    //   '1313123', '222313', '34214214'
    // ]
    // ejs.renderFile('view/login.ejs', {
    //   msg: arr,
    //   list: list,
    //   msg: s
    // }, (err, data) => {
    //   res.end(data)
    // })
    ejs.renderFile('view/form.ejs', {}, (err, data) => {
      res.end(data)
    })
  } else if (pathname == '/dologin' && methods === 'post') {
    // get取参数
    let data = '';

    req.on('data', (chunk) => {
      console.log('chunk: ', chunk);
      data += chunk;
    })
    req.on('data', (err, chunk) => {
      console.log('data: ', data);
    })
    res.end("<script>alert('登陆成功')</script>")
  }
}).listen(8001);
