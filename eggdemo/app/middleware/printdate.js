module.exports = (options, app) => {
  return async function printdate(ctx, next) {
    console.log(new Date());
    await next();
  }
}
