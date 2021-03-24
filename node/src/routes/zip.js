/*
 * @Author: 杨宏旋
 * @Date: 2021-03-24 15:17:03
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-03-24 15:30:46
 * @Description:
 */
const router = require('koa-router')()
const ZIPController = require('../controller/zip')

router.post('/api/downzip', ZIPController.index)

module.exports = router
