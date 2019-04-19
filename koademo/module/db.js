const MongoClient = require('mongodb').MongoClient;
// 引入配置
const config = require('./config');
class DB {
  static getInstance() { // 单例模式
    if (!DB.instance) {
      DB.instance = new DB();
    }
    return DB.instance;
  }
  constructor() {
    // this.connect();
    this.dbClient = '';
  }
  // 链接数据库
  connect() {
    return new Promise((resolve, reject) => {
      if (!this.dbClient) { // 多次链接数据库
        MongoClient.connect(config.mongourl, (err, client) => {
          if (err) {
            reject(err);
            return;
          }
          const db = client.db(config.dbname);
          this.dbClient = db;
          resolve(this.dbClient);
        })
      } else {
        console.log('链接数据库111');
        resolve(this.dbClient);
      }
    })
  }
  // 查找数据库
  find(collectionNamem, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        var result = db.collection(collectionNamem).find(json);
        result.toArray(function (error, docs) {
          if (error) {
            reject(error);
            return;
          }

          resolve(docs);
        });
      }).catch(function (err) {
        console.log('err: ', err);
      });
    });
  }
  // 更新数据库
  update() {

  }
  // 插入数据库
  insert() {

  }
  // 删除数据库
  delete() {

  }
}
const db1 = DB.getInstance();
setTimeout(() => {
  console.time('db1');
  db1.find('user', {}).then(res => {
    console.timeEnd('db1');
  }).catch(err => {
    console.log('err: ', err);
  })
}, 100)

setTimeout(() => {
  console.time('db2');
  db1.find('user', {}).then(res => {
    console.timeEnd('db2');
  }).catch(err => {
    console.log('err: ', err);
  })
}, 1000)
const db2 = DB.getInstance();
setTimeout(() => {
  console.time('db3');
  db2.find('user', {}).then(res => {
    console.timeEnd('db3');
  }).catch(err => {
    console.log('err: ', err);
  })
}, 3000)
const db3 = DB.getInstance();
setTimeout(() => {
  console.time('db4');
  db3.find('user', {}).then(res => {
    console.timeEnd('db4');
  }).catch(err => {
    console.log('err: ', err);
  })
}, 5000)
