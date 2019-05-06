module.exports = (options) => {
  return async function adminauth(ctx, next) {
    //登录校验
    if (ctx.session.userinfo) {
      await next();
    } else {
      ctx.body = {
        data: '-99'
      }
    }
  }
}
