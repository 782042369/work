import express from 'express';
// router
const router = express.Router();
// 后台路由 配置
import login from './admin/login'
import user from './admin/user'
import product from './admin/product'

router.use('/login', login);
router.use('/user', user);
router.use('/product', product);
export default router;
