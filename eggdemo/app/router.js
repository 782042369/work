/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 路由
 * @Date: 2019-04-29 15:37:12
 * @LastEditTime: 2019-05-05 14:43:43
 */
'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  /**
   * 后台
   */
  require('./routes/admin')(app);
  /**
   * api
   */
  // require('./routes/api')(app)
  /**
   * 前台
   */
  require('./routes/index')(app);

};
