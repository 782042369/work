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
   * 前台
   */
  router.get('/', controller.index.home.index);
};
