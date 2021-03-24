/*
 * @Author: 杨宏旋
 * @Date: 2021-03-24 15:13:11
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-03-24 15:20:24
 * @Description:
 */
const Koa = require('koa')
// const json = require('koa-json');
const bodyparser = require('koa-bodyparser')
const compress = require('koa-compress')
// const { createProxyMiddleware } = require('http-proxy-middleware');
// const k2c = require('koa2-connect');
const cors = require('koa2-cors')
const zip = require('./routes/zip')
const app = new Koa()
// GZIP
const options = { threshold: 1024 }
app.use(compress(options))
// 跨域
app.use(
  cors({
    maxAge: 5, // 指定本次预检请求的有效期，单位为秒。
    credentials: true, // 是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], // 设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'], // 设置获取其他自定义字段
  })
)

// routes
app.use(zip.routes(), zip.allowedMethods())
module.exports = app
