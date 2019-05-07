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
   * 登录
   */
  router.post('/dologin', controller.admin.login.index);
  router.get('/loginout', controller.admin.login.loginout);
  router.get('/captchacode', controller.admin.base.code);

  /**
   * 权限
   */
  router.post('/adminAccess', controller.admin.access.index);
  router.post('/adminAddAccess', controller.admin.access.add);
  router.delete('/adminDeleteAccess', controller.admin.access.delete);
  router.put('/adminEditAccess', controller.admin.access.edit);
  /**
   * 管理员
   */
  router.post('/adminManagerlist', controller.admin.manager.index);
  router.post('/adminAddManager', controller.admin.manager.add);
  router.delete('/adminDeleteManager', controller.admin.manager.delete);
  router.put('/adminEditManager', controller.admin.manager.edit);
  /**
   * 角色
   */
  router.post('/adminRolelist', controller.admin.role.index);
  router.post('/adminAddRole', controller.admin.role.add);
  router.delete('/adminDeleteRole', controller.admin.role.delete);
  router.put('/adminEditRole', controller.admin.role.edit);

};
