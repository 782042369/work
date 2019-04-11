const model = {};
const app = function (req, res) {
  console.log('req: ', req);
  if (model['login']) {
    model['login'](req, res);
  }
}
// 定义
app.get = function (string, callback) {
  // 注册
  model[string] = callback;
  console.log('model: ', model);
}
// 执行
app.get('login', (req, res) => {
  console.log('login')
})
setTimeout(() => {
  app('req', 'res');
}, 10);
