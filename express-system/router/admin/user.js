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
  ConnectDbFind('user', {}, (error, data) => {
    if (error) {
      console.log('数据错误', error)
      return
    }
    res.render('admin/user/index', {
      list: data
    })
  })
})
// 增加商品列表
router.get('/add', (req, res) => {
  res.render('admin/user/add')
})
// 获取增加商品列表
router.post('/douseradd', (req, res) => {
  var form = new multiparty.Form();
  form.uploadDir = 'upload'; // 上传图片保存地址 必须存在
  form.parse(req, function (err, fields, files) {
    // files // 上传成功地址
    // fields // 表单数据
    let {
      username,
      description
    } = fields;
    let pic = files.pic[0].path;
    console.log('files: ', files);
    console.log('fields: ', fields);
    ConnectDbAdd('user', {
      username,
      pic,
      description
    }, (err, data) => {
      if (err) {
        console.log('err: ', err);
      } else {
        res.redirect('/admin/user')
      }
    })
  });
})
// 编辑商品列表
router.get('/edit', (req, res) => {
  ConnectDbFind('user', {
    "_id": new ObjectId(req.query.id)
  }, (error, data) => {
    if (error) {
      console.log('数据错误', error)
      return
    }
    res.render('admin/user/edit', {
      list: data
    })
  });
})
// 修改商品
router.post('/doedit', (req, res) => {
  let form = new multiparty.Form();
  form.uploadDir = 'upload'; // 上传图片保存地址 必须存在
  form.parse(req, function (err, fields, files) {
    // files // 上传成功地址
    // fields // 表单数据
    let id = fields._id[0]
    let {
      username,
      description,
    } = fields;
    let arr = {
      username,
      description,
    };
    if (files.pic[0].originalFilename !== '') {
      arr.pic = files.pic[0].path
    } else {
      fs.unlink(files.pic[0].path)
    }
    ConnectDbEdit('user', {
      "_id": new ObjectId(id)
    }, arr, (err, data) => {
      if (err) {
        console.log('err: ', err);
      } else {
        res.redirect('/admin/user')
      }
    })
  });
})
// 删除商品列表
router.get('/delete', (req, res) => {
  ConnectDbDeleteOne('user', {
    "_id": new ObjectId(req.query.id)
  }, (error, data) => {
    if (error) {
      console.log('数据错误', error)
      return
    }
    res.redirect('/admin/user')
  })
})
export default router;
