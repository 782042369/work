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
  router.get('/admin/access', controller.admin.access.index);
  router.put('/admin/access/add', controller.admin.access.add);
  router.get('/admin/access/delete', controller.admin.access.delete);
  router.get('/admin/access/edit', controller.admin.access.edit);
  /**
   * 管理员
   */
  router.get('/admin/manager', controller.admin.manager.index);
  router.put('/admin/manager/add', controller.admin.manager.add);
  router.get('/admin/manager/delete', controller.admin.manager.delete);
  router.get('/admin/manager/edit', controller.admin.manager.edit);
  /**
   * 角色
   */
  router.get('/admin/rolelist', controller.admin.role.index);
  router.put('/admin/role/add', controller.admin.role.add);
  router.get('/admin/role/delete', controller.admin.role.delete);
  router.get('/admin/role/edit', controller.admin.role.edit);

};
