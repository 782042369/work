/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 路由
 * @Date: 2019-04-29 15:37:12
 * @LastEditTime: 2019-06-03 13:32:17
 */
/**
 * @param {Egg.Application} app - egg application
 */
import admin from './routes/admin'
import index from './routes/index'
// import api from './routes/api'
import { Application } from 'egg'
export default (app: Application) => {
	/**
   * 后台
   */
	admin(app)
	/**
   * api
   */
	// api(app)
	/**
   * 前台
   */
	index(app)
}
