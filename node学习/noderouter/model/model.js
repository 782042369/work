const ejs = require('ejs');
const app = {
  login(req, res) {
    console.log('req: ', req);
    ejs.renderFile('view/form.ejs', {}, (err, data) => {
      res.end(data)
    })
  },
  dologin(req, res) {
    let methods = req.method.toLowerCase();
    // get取参数
    // query
    // post取参数
    let data = '';
    req.on('data', (chunk) => {
      console.log('chunk: ', chunk);
      data += chunk;
    })
    req.on('data', (err, chunk) => {
      console.log('data: ', data);
    })
    res.end("<script>alert('登陆成功')</script>")
  },
  register(req, res) {

  },
  index(req, res) {
    ejs.renderFile('view/index.ejs', {}, (err, data) => {
      res.end(data)
    })
  },
}
module.exports = app;
