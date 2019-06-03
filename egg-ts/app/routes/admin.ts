import { Application } from 'egg';
export default function admin(app: Application): void {
	const { router, controller }: any = app;
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
	router.post('/admin/addgoodstype', controller.admin.goodsType.addgoods);
	router.put('/admin/editgoodstype', controller.admin.goodsType.editgoods);
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
	/**
   * 商品颜色
   */
	router.post('/admin/goodscolorlist', controller.admin.goodsColor.index);
	router.post('/admin/addgoodscolor', controller.admin.goodsColor.addgoodscolor);
	router.put('/admin/editgoodscolor', controller.admin.goodsColor.editgoodscolor);
	router.delete('/admin/deletegoodscolor', controller.admin.goodsColor.deletegoodscolor);
	/**
   * 商品颜色
   */
	router.post('/admin/goodslist', controller.admin.goods.index);
	router.post('/admin/addgoods', controller.admin.goods.addgoods);
	router.put('/admin/editgoods', controller.admin.goods.editgoods);
	router.delete('/admin/deletegoods', controller.admin.goods.deletegoods);
	/**
   * 删除商品相册
   */
	router.delete('/admin/deletegoodsphotolist', controller.admin.goods.deletegoodsphotolist);
	router.put('/admin/editgoodsphotocolor', controller.admin.goods.editgoodsphotocolor);
	/**
   * 导航
   */
	router.post('/admin/navlist', controller.admin.nav.index);
	router.post('/admin/addnav', controller.admin.nav.addnav);
	router.put('/admin/editnav', controller.admin.nav.editnav);
	router.delete('/admin/deletenav', controller.admin.nav.deletenav);
	/**
   * 文章
   */
	router.post('/admin/articlelist', controller.admin.article.index);
	router.post('/admin/addarticle', controller.admin.article.addarticle);
	router.put('/admin/editarticle', controller.admin.article.editarticle);
	router.delete('/admin/deletearticle', controller.admin.article.deletearticle);
	/**
   * 设置
   */
	router.post('/admin/getsetting', controller.admin.setting.getsetting);
	router.put('/admin/editsetting', controller.admin.setting.editsetting);
}
