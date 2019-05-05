'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller
  } = app;
  /**
   * 前台
   */
  router.get('/', controller.home.order);
  router.get('/user', controller.user.index);
  router.get('/adduser', controller.user.adduser);
  router.get('/order', controller.order.index);
  // router.get('/orderitem', controller.order.orderitem);
  router.get('/news', controller.news.index);
  router.get('/newscontent', controller.news.content);
  router.get('/newslist/:id', controller.news.list);
};
