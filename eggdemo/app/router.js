'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller
  } = app;
  router.get('/', controller.home.index);
  router.post('/add', controller.home.add);
  router.get('/news', controller.news.index);
  router.get('/newscontent', controller.news.content);
  router.get('/newslist/:id', controller.news.list);
  router.get('/admin', controller.admin.index);
};
