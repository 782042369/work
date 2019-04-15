import express from 'express';
// 引入路由
const router = express.Router();
import admin from './admin.js'

router.use('/admin', admin);

export default router;
