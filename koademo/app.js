const koa = require('koa');
const app = new koa();

// express
// app.use('/',(req,res)=>{

// })
app.use(async (ctx) => {
  ctx.body = '你好 koa2'
})
app.listen(3000, '127.0.0.1');
