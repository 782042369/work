import express from 'express';
const router = express.Router();
// bodyparser
import bodyparser from 'body-parser';
const jsonParser = bodyparser.json();
// create application / x - www - form - urlencoded parser
const urlencodedParser = bodyparser.urlencoded({
  extended: false
});
// 使用中间件
router.use(jsonParser);
router.use(urlencodedParser);

import {
  md5model
} from '../../tool/Md5';
import {
  ConnectDbFind,
} from '../../tool/db';
router.get('/', (req, res) => {
  res.render('admin/login')
})

router.post('/dologin', (req, res) => {
  const password = md5model(req.body.password)
  const username = req.body.username
  ConnectDbFind('user', {
    username,
    password
  }, (error, data) => {
    if (error) {
      console.log('error', error)
      return
    }
    if (data.length > 0) {
      // 用户登陆信息
      console.log('req.session: ', req.session);
      // req.session.userinfo = data[0]
      // app.locals['userinfo'] = data[0].username // 全局ejs模版
      // 登陆成功跳转
      res.redirect('/admin/product')
    } else {
      // 登陆失败
      res.send(`<script>alert("登陆失败");location.href="/admin/login"</script>`)
    }
  })
})
// 退出登陆
router.get('/loginout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log('err: ', err)
      return
    } else {
      res.redirect('/login')
    }
  })
})
export default router;
