const http = require('http');
const app = require('./model/express-router');
const url = require('url');
const ejs = require('ejs');
const MongoClient = require('mongodb').MongoClient;
const mongourl = 'mongodb://127.0.0.1:27017/nodedemo'
http.createServer(app).listen(3000);
// 查询
app.get('/', (req, res) => {
  MongoClient.connect(mongourl, (err, db) => {
    if (err) {
      console.log('数据库链接失败err: ', err);
      return;
    }
    let list = [];
    let data = db.collection('user').find({});
    data.each((err, doc) => {
      if (err) {
        console.log('err: ', err);
      } else {
        if (doc !== null) {
          console.log('doc: ', doc);
          list.push(doc);
        } else {
          ejs.renderFile('./view/index.ejs', {
            list: list
          }, (err, data) => {
            res.send(data)
          })
          db.close(); // 关闭数据库
          console.log(list);
        }
      }
    })
    // 链接成功
    // db.collection('user').deleteOne({
    //   "name": query.name
    // }, function (error, data) {
    //   console.log('data: ', data.result);
    //   if (error) {
    //     console.log('查询数据库失败err: ', err);
    //     return
    //   }
    //   ejs.renderFile('./view/index.ejs', {
    //     list: list
    //   }, (err, data) => {
    //     res.send(data)
    //   })
    //   db.close(); // 关闭数据库
    // })
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
