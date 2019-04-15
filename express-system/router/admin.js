import express from 'express';
// router
const router = express.Router();
// 后台路由 配置
import login from './admin/login'
import user from './admin/user'
import product from './admin/product'

import session from 'express-session';
router.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 6 * 30
    },
    rolling: true
  })
)
router.use('/', (req, res, next) => {
  const urlpass = ['/login', '/login/dologin']
  // if ((req.session.userinfo && req.session.userinfo.username !== '') || urlpass.includes(req.url)) {
  //   // 	// 登陆判断
    next()
  // } else {
  //   res.redirect('/admin/login')
  // }
})
router.use('/login', login);
router.use('/user', user);
router.use('/product', product);
export default router;
