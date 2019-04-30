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
  router.get('/login', controller.admin.login.index);

  router.get('/admin/article', controller.admin.article.index);
  router.get('/admin/article/add', controller.admin.article.add);
  router.get('/admin/article/delete', controller.admin.article.delete);
  router.get('/admin/article/edit', controller.admin.article.edit);

  router.get('/admin/product', controller.admin.product.index);
  router.get('/admin/product/add', controller.admin.product.add);
  router.get('/admin/product/delete', controller.admin.product.delete);
  router.get('/admin/product/edit', controller.admin.product.edit);

  router.get('/admin/user', controller.admin.user.index);
  router.get('/admin/user/add', controller.admin.user.add);
  router.get('/admin/user/delete', controller.admin.user.delete);
  router.get('/admin/user/edit', controller.admin.user.edit);
  
};
