module.exports = (options, app) => {
  return async function auth(ctx, next) {
    ctx.state.csrf = ctx.csrf;
    await next();
  }
}
