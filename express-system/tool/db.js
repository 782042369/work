// mongodb 设置
import mongodb from 'mongodb';
// mongodburl 设置
const MongoClient = mongodb.MongoClient;
const dburl = 'mongodb://127.0.0.1:27017/productmanage';

function _connectDB(callback) {
  MongoClient.connect(dburl, (err, db) => {
    if (err) {
      console.log('err: ', err);
      return;
    }
    // db链接
    callback(db);
    // 关闭数据库
    db.close()
  })
}
// 查找数据
export function ConnectDbFind(collectionname, json, callback) {
  _connectDB(db => {
    let data = db.collection(collectionname).find(json);
    data.toArray((error, data) => {
      if (error) {
        console.log('error: ', error);
        return;
      }
      callback(error, data);
    })
  })
}
// 增加数据
export function ConnectDbAdd(collectionname, json, callback) {
  _connectDB(db => {
    db.collection(collectionname).insertOne(json, (error, data) => {
      callback(error, data);
    });
  })
}
// 修改更新数据
export function ConnectDbEdit(collectionname, json1, json2, callback) {
  _connectDB(db => {
    db.collection(collectionname).updateOne(json1, {
      $set: json2
    }, (error, data) => {
      callback(error, data);
    });
  })
}
// 删除数据
export function ConnectDbDeleteOne(collectionname, json, callback) {
  _connectDB(db => {
    db.collection(collectionname).deleteOne(json, (error, data) => {
      callback(error, data);
    });
  })
}
