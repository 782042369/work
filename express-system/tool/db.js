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
    callback(err, db);
    // 关闭数据库
    db.close()
  })
}
// 查找数据
export function _connectDBfind(collectionname, json, callback) {
  _connectDB((err, db) => {
    if (err) {
      console.log('err: ', err);
      return;
    }
    let data = db.collection(collectionname).find(json);
    data.toArray((error, data) => {
      callback(error, data);
    })
  })
}
