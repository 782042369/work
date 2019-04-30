module.exports = (options, app) => {
  return async function auth(ctx, next) {
    // 登录校验
    if (ctx.session && ctx.session.userinfo) {
      await next();
    } else {
      ctx.redirect('/login')
    }
  }
}
