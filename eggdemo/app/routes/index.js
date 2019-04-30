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
  router.post('/add', controller.home.add);
  router.get('/news', controller.news.index);
  router.get('/newscontent', controller.news.content);
  router.get('/newslist/:id', controller.news.list);
};
