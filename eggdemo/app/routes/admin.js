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
   * 登录
   */
  router.post('/dologin', controller.admin.login.index);
  router.get('/loginout', controller.admin.login.loginout);
  router.get('/captchacode', controller.admin.base.code);

  /**
   * 权限
   */
  router.post('/admin/Accesslist', controller.admin.access.index);
  router.post('/admin/AddAccess', controller.admin.access.add);
  router.delete('/admin/DeleteAccess', controller.admin.access.delete);
  router.put('/admin/EditAccess', controller.admin.access.edit);
  router.get('/admin/FindAccessList', controller.admin.access.findaccesslist);

  /**
   * 管理员
   */
  router.post('/admin/Managerlist', controller.admin.manager.index);
  router.post('/admin/AddManager', controller.admin.manager.add);
  router.delete('/admin/DeleteManager', controller.admin.manager.delete);
  router.put('/admin/EditManager', controller.admin.manager.edit);
  /**
   * 角色
   */
  router.post('/admin/Rolelist', controller.admin.role.index);
  router.post('/admin/AddRole', controller.admin.role.add);
  router.delete('/admin/DeleteRole', controller.admin.role.delete);
  router.put('/admin/EditRole', controller.admin.role.edit);
  router.post('/admin/auth', controller.admin.role.auth);
  router.get('/admin/authlist', controller.admin.role.authlist);
};
