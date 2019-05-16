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
   * 通用方法
   */
  router.post('/admin/uploadimg', controller.admin.uploadimg.uploadimg);

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
  router.post('/admin/addbanner', controller.admin.focus.addbanner);
  router.post('/admin/bannerlist', controller.admin.focus.bannerlist);
  router.put('/admin/editbanner', controller.admin.focus.editbanner);
  router.delete('/admin/deletebanner', controller.admin.focus.deletebanner);
  /**
   * 商品管理类型
   */
  router.post('/admin/goodstypelist', controller.admin.goodsType.index);
  router.post('/admin/addgoods', controller.admin.goodsType.addgoods);
  router.put('/admin/editgoods', controller.admin.goodsType.editgoods);
  router.delete('/admin/deletegoodstype', controller.admin.goodsType.deletegoods);
  /**
   * 商品属性
   */
  router.post('/admin/goodstypeattributelist', controller.admin.goodsTypeAttribute.index);
  router.post('/admin/addgoodsattribute', controller.admin.goodsTypeAttribute.addgoodsattribute);
  router.put('/admin/editgoodsattribute', controller.admin.goodsTypeAttribute.editgoodsattribute);
  router.delete('/admin/deletegoodstypeattribute', controller.admin.goodsTypeAttribute.deletegoodsattribute);
  /**
   * 商品分类
   */
  router.post('/admin/goodscatelist', controller.admin.goodsCate.index);
  router.post('/admin/addgoodscate', controller.admin.goodsCate.addgoodscate);
  router.put('/admin/editgoodscate', controller.admin.goodsCate.editgoodscate);
  router.delete('/admin/deletegoodscate', controller.admin.goodsCate.deletegoodscate);
};
