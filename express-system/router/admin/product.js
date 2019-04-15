import express from 'express';
import {
  ConnectDbFind,
  ConnectDbAdd,
  ConnectDbEdit,
  ObjectId,
  ConnectDbDeleteOne
} from '../../tool/db';
// 图片上传 也可以 获取表单数据
import multiparty from 'multiparty';
// 删除文件
import fs from 'fs';
const router = express.Router();
// 商品
router.get('/', (req, res) => {
  ConnectDbFind('productlist', {}, (error, data) => {
    if (error) {
      console.log('数据错误', error)
      return
    }
    res.render('admin/product/index', {
      list: data
    })
  })
})
// 增加商品列表
router.get('/productadd', (req, res) => {
  res.render('add')
})
// 获取增加商品列表
router.post('/doproductadd', (req, res) => {
  var form = new multiparty.Form();
  form.uploadDir = 'upload'; // 上传图片保存地址 必须存在
  form.parse(req, function (err, fields, files) {
    // files // 上传成功地址
    // fields // 表单数据
    let {
      title,
      price,
      fee,
      description
    } = fields;
    let pic = files.pic[0].path;
    ConnectDbAdd('productlist', {
      title,
      price,
      fee,
      description,
      pic
    }, (err, data) => {
      if (err) {
        console.log('err: ', err);
      } else {
        res.redirect('/product')
      }
    })
  });
})
// 编辑商品列表
router.get('/productedit', (req, res) => {
  ConnectDbFind('productlist', {
    "_id": new ObjectId(req.query.id)
  }, (error, data) => {
    if (error) {
      console.log('数据错误', error)
      return
    }
    res.render('edit', {
      list: data
    })
  });
})
// 修改商品
router.post('/doproductedit', (req, res) => {
  let form = new multiparty.Form();
  form.uploadDir = 'upload'; // 上传图片保存地址 必须存在
  form.parse(req, function (err, fields, files) {
    // files // 上传成功地址
    // fields // 表单数据
    let id = fields._id[0]
    let {
      title,
      price,
      fee,
      description
    } = fields;
    let arr = {
      title,
      price,
      fee,
      description,
    };
    if (files.pic[0].originalFilename !== '') {
      arr.pic = files.pic[0].path
    } else {
      fs.unlink(files.pic[0].path)
    }
    ConnectDbEdit('productlist', {
      "_id": new ObjectId(id)
    }, arr, (err, data) => {
      if (err) {
        console.log('err: ', err);
      } else {
        res.redirect('/product')
      }
    })
  });
})
// 删除商品列表
router.get('/productdelete', (req, res) => {
  ConnectDbDeleteOne('productlist', {
    "_id": new ObjectId(req.query.id)
  }, (error, data) => {
    if (error) {
      console.log('数据错误', error)
      return
    }
    res.redirect('/product')
  })
})
export default router;
