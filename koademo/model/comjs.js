exports.getpostdata = function (ctx) {
  return new Promise(function (resolve, reject) {
    try {
      var str = '';
      ctx.req.on('data', function (chunk) {
        str += chunk;
      });
      ctx.end.on('end', function () {
        resolve(str);
      });
    } catch (error) {
      reject(error);
    }
  });
}
