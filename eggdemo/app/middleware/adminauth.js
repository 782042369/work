'use strict';
module.exports = () => {
  return async function adminauth(ctx, next) {
    // admin后台登录校验
    // if (ctx.session.userinfo) {
    await next();
    // } else {
    //   ctx.body = {
    //     data: '-99'
    //   }
    // }
  };
};
