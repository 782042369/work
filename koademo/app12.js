/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description:  单列
 * @Date: 2019-04-19 11:33:56
 * @LastEditTime: 2019-04-19 12:00:27
 */
class DB {
  static getInstance() {
    if (!DB.instance) {
      DB.instance = new DB();
    }
    return DB.instance;
  }
  constructor() {
    console.log('构造函数');
    this.connect();
  }
  connect() {
    console.log('链接数据库');
  }
  find() {
    console.log('查找据库');
  }
}
let db1 = DB.getInstance();
db1.find();
let db2 = DB.getInstance();
db2.find();
let db3 = DB.getInstance();
db3.find();
let db4 = DB.getInstance();
db3.find();
