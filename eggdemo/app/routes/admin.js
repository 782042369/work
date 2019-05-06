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
  router.post('/admin/access', controller.admin.access.index);
  router.put('/admin/access/add', controller.admin.access.add);
  router.delete('/admin/access/delete', controller.admin.access.delete);
  router.put('/admin/access/edit', controller.admin.access.edit);
  /**
   * 管理员
   */
  router.post('/admin/manager', controller.admin.manager.index);
  router.put('/admin/manager/add', controller.admin.manager.add);
  router.delete('/admin/manager/delete', controller.admin.manager.delete);
  router.put('/admin/manager/edit', controller.admin.manager.edit);
  /**
   * 角色
   */
  router.post('/admin/rolelist', controller.admin.role.index);
  router.put('/admin/role/add', controller.admin.role.add);
  router.delete('/admin/role/delete', controller.admin.role.delete);
  router.put('/admin/role/edit', controller.admin.role.edit);

};
