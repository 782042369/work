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
   * 后台
   */
  require('./routes/admin')(app)
  /**
   * api
   */
  require('./routes/api')(app)
  /**
   * 前台
   */
  require('./routes/index')(app)
};
