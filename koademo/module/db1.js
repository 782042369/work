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
    this.connect();
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
        const result = db.collection(collectionNamem).find(json);
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
  update(collectionNamem, json, json1) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectionNamem).updateOne(json, {
          $set: json1
        }, (err, res) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(res);
        });

      }).catch(function (err) {
        console.log('err: ', err);
      });
    });
  }
  // 插入数据库
  insert(collectionNamem, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectionNamem).insertOne(json, (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        });
      }).catch(function (err) {
        console.log('err: ', err);
      });
    });
  }
  // 删除数据库
  delete(collectionNamem, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectionNamem).removeOne(json, (err, res) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(res);
        });

      }).catch(function (err) {
        console.log('err: ', err);
      });
    });
  }
}
module.exports = DB.getInstance();
