module.exports = (options) => {
  return async function adminauth(ctx, next) {
    //登录校验
    console.log('ctx.session.userinfo: ', ctx.session.userinfo);
    // if (ctx.session.userinfo) {
      await next();
    // } else {
    //   ctx.body = {
    //     data: '-99'
    //   }
    // }
  }
}
