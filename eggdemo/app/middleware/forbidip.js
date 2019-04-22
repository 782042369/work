module.exports = (options, app) => {
  return async function forbidip(ctx, next) {
    const ip = options.forbidips;
    if (ip.includes(ctx.request.ip)) {
      ctx.status = 403;
      ctx.body = '您的ip已经被屏蔽';
    } else {
      await next();
    }
  }
}
