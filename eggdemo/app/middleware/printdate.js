module.exports = (options, app) => {
  return async function printdate(ctx, next) {
    console.log(new Date());
    const ip = '127.0.0.1'
    // if (ctx.request.ip === ip) {
    //   console.log(1);
    //   ctx.status = 403
    //   ctx.body = 'ip屏蔽'
    // } else {
    //   console.log(2);
    await next();
    // }
  }
}
