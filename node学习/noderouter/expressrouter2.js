const http = require('http');
const app = require('./model/express-router');
const ejs = require('ejs');
http.createServer(app).listen(3000);

app.get('/', (req, res) => {
  ejs.renderFile('./view/index.ejs', (err, data) => {
    res.send(data)
  })
})
app.get('/login', (req, res) => {
  ejs.renderFile('./view/form.ejs', (err, data) => {
    res.send(data)
  })
})
app.post('/register', (req, res) => {
  console.log('req.body: ', req.body);
  res.send("<script>alert('登陆成功')</script>")
})
