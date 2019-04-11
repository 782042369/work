const http = require('http');
const app = require('./model/express-router');
const url = require('url');
const ejs = require('ejs');
const MongoClient = require('mongodb').MongoClient;
const mongourl = 'mongodb://127.0.0.1:27017/nodedemo'
http.createServer(app).listen(3000);

app.get('/', (req, res) => {
  ejs.renderFile('./view/index.ejs', (err, data) => {
    res.send(data)
  })
})
// 增加
app.get('/add', (req, res) => {
  MongoClient.connect(mongourl, (err, db) => {
    if (err) {
      console.log('数据库链接失败err: ', err);
      return;
    }
    // 链接成功
    db.collection('user').insertOne({
      "name": "杨宏旋",
      "age": 10
    }, function (error, data) {
      if (error) {
        console.log('增加数据库失败err: ', err);
        return
      }
      res.send('增加数据成功');
      db.close(); // 关闭数据库
    })
  })
})
// 修改
app.get('/edit', (req, res) => {
  MongoClient.connect(mongourl, (err, db) => {
    if (err) {
      console.log('数据库链接失败err: ', err);
      return;
    }
    // 链接成功
    db.collection('user').updateOne({
      "name": "杨宏旋"
    }, {
      $set: {
        "age": 90
      }
    }, function (error, data) {
      if (error) {
        console.log('修改数据库失败err: ', err);
        return
      }
      console.log('data: ', data);
      res.send('修改数据成功');
      db.close(); // 关闭数据库
    })
  })
})
// 删除
app.get('/delete', (req, res) => {
  let query = url.parse(req.url, true).query;
  MongoClient.connect(mongourl, (err, db) => {
    if (err) {
      console.log('数据库链接失败err: ', err);
      return;
    }
    // 链接成功
    db.collection('user').deleteOne({
      "name": query.name
    }, function (error, data) {
      console.log('data: ', data.result);
      if (error) {
        console.log('删除数据库失败err: ', err);
        return
      }
      res.send('删除数据成功');
      db.close(); // 关闭数据库
    })
  })
})
app.get('/login', (req, res) => {
  ejs.renderFile('./view/form.ejs', (err, data) => {
    res.send(data)
  })
})
app.post('/register', (req, res) => {
  res.send("<script>alert('登陆成功')</script>")
})
