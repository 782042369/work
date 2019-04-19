/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description:  链接数据库
 * @Date: 2019-04-19 11:33:56
 * @LastEditTime: 2019-04-19 12:22:40
 */
const MongoClient = require('mongodb').MongoClient;
const mongourl = 'mongodb://127.0.0.1:27017';
const dbname = 'koa';
console.time('start');
MongoClient.connect(mongourl, (err, client) => {
  if (err) {
    console.log('连接数据库失败', err);
    return;
  }
  const db = client.db(dbname);
  // 增加对象
  db.collection('user').insertOne({
    username: "张三weqweDASDAqw",
    age: 20,
    sex: "男",
    status: "1",
  }, (error, res) => {
    if (error) {
      console.log('增加数据库失败', error);
      return;
    }
    console.timeEnd('start');
  })
})
console.time('start1');
MongoClient.connect(mongourl, (err, client) => {
  if (err) {
    console.log('连接数据库失败', err);
    return;
  }
  const db = client.db(dbname);
  // 增加对象
  const res = db.collection('user').find({});
  res.toArray((error, docs) => {
    if (error) {
      console.log('增加数据库失败', error);
      return;
    }
    console.timeEnd('start1');
  })
})
