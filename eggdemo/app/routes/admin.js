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
  router.post('/admin/auth', controller.admin.role.auth);
  router.get('/admin/authlist', controller.admin.role.authlist);
  router.put('/admin/EditRole', controller.admin.role.edit);
  router.delete('/admin/DeleteRole', controller.admin.role.delete);
  /**
   * 轮播图管理
   */
  router.post('/admin/uploadimg', controller.admin.focus.uploadimg);
  router.post('/admin/addbanner', controller.admin.focus.addbanner);
  router.post('/admin/bannerlist', controller.admin.focus.bannerlist);
  router.put('/admin/editbanner', controller.admin.focus.editbanner);
  router.delete('/admin/deletebanner', controller.admin.focus.deletebanner);
  /**
   * 商品管理
   */
  router.post('/admin/goodstypelist', controller.admin.goods.index);
  router.post('/admin/addgoods', controller.admin.goods.addgoods);
  router.put('/admin/editgoods', controller.admin.goods.editgoods);
  router.delete('/admin/deletegoodstype', controller.admin.goods.deletegoods);
};
