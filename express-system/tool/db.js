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
    // 关闭数据库
    db.close()
    // db链接
    callback(err, db);
  })
}
// 查找数据
exports.find = function (collectionname, json, callback) {
  console.log('json: ', json);
  console.log('collectionname: ', collectionname);
  _connectDB((err, db) => {
    if (err) {
      console.log('err: ', err);
      return;
    }
    let data = db.collectionname.find(json);
    data.toArray((error, data) => {
      callback(error, data);
    })
  })
}
