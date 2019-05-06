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
  router.put('/adminAddAccess', controller.admin.access.add);
  router.delete('/adminDeleteAccess', controller.admin.access.delete);
  router.put('/adminEditAccess', controller.admin.access.edit);
  /**
   * 管理员
   */
  router.post('/adminManager', controller.admin.manager.index);
  router.put('/adminAddManager/add', controller.admin.manager.add);
  router.delete('/adminDeleteManager/delete', controller.admin.manager.delete);
  router.put('/adminEditManager/edit', controller.admin.manager.edit);
  /**
   * 角色
   */
  router.post('/adminRolelist', controller.admin.role.index);
  router.put('/adminAddRole', controller.admin.role.add);
  router.delete('/adminDeleteRole', controller.admin.role.delete);
  router.put('/adminEditRole', controller.admin.role.edit);

};
