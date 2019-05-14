/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 路由
 * @Date: 2019-04-29 15:37:12
 * @LastEditTime: 2019-05-14 12:18:47
 */
'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller,
  } = app;
  /**
   * 后台
   */
  require('./routes/admin')(app);
  /**
   * api
   */
  // require('./routes/api')(app)
  router.post('/memberLottery/checkUserMember', controller.index.home.index);

  /**
   * 前台
   */
  require('./routes/index')(app);

};
