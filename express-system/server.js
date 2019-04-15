import express from 'express';
// import bodyparser from 'body-parser';
// session
import session from 'express-session';
// 图片上传 也可以 获取表单数据
import multiparty from 'multiparty';
// 删除文件
import fs from 'fs';
// 密码加密
import {
	md5model
} from './tool/Md5';
// db封装
import {
	ConnectDbFind,
	ConnectDbAdd,
	ConnectDbEdit,
	ObjectId,
	ConnectDbDeleteOne
} from './tool/db';
// bodyparser设置
// const jsonParser = bodyparser.json();
// create application/x-www-form-urlencoded parser
// const urlencodedParser = bodyparser.urlencoded({
// 	extended: false
// });
// 实列
const app = new express();
app.locals['userinfo'] = '124' // 全局ejs模版

// ejs模版
app.set('view engine', 'ejs')
// 静态资源目录
app.use(express.static('public'));
app.use('/upload', express.static('upload'));
// 使用中间件
// app.use(jsonParser);
// app.use(urlencodedParser);
// 使用中间件session
app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 1000 * 6 * 30
		},
		rolling: true
	})
)
// 自定义判断登陆状态
app.use('/', (req, res, next) => {
	const urlpass = ['/login', '/dologin']
	// if ((req.session.userinfo && req.session.userinfo.username !== '') || urlpass.includes(req.url)) {
	// 	// 登陆判断
	next()
	// } else {
	// 	res.redirect('/login')
	// }
})
// 首页
app.get('/', (req, res) => {
	res.render('index')
})
// 登陆
app.get('/login', (req, res) => {
	res.render('login')
})
// 验证登陆
app.post('/dologin', (req, res) => {
	const password = md5model(req.body.password)
	const username = req.body.username
	ConnectDbFind('user', {
		username,
		password
	}, (error, data) => {
		if (error) {
			console.log('error', error)
			return
		}
		if (data.length > 0) {
			// 用户登陆信息
			req.session.userinfo = data[0]
			app.locals['userinfo'] = data[0].username // 全局ejs模版
			// 登陆成功跳转
			res.redirect('/product')
		} else {
			// 登陆失败
			res.send(`<script>alert("登陆失败");location.href="/login"</script>`)
		}
	})
})
// 退出登陆
app.get('/loginout', (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			console.log('err: ', err)
			return
		} else {
			res.redirect('/login')
		}
	})
})
// 商品
app.get('/product', (req, res) => {
	ConnectDbFind('productlist', {}, (error, data) => {
		if (error) {
			console.log('数据错误', error)
			return
		}
		res.render('index', {
			list: data
		})
	})
})
// 增加商品列表
app.get('/productadd', (req, res) => {
	res.render('add')
})
// 获取增加商品列表
app.post('/doproductadd', (req, res) => {
	var form = new multiparty.Form();
	form.uploadDir = 'upload'; // 上传图片保存地址 必须存在
	form.parse(req, function (err, fields, files) {
		// files // 上传成功地址
		// fields // 表单数据
		let {
			title,
			price,
			fee,
			description
		} = fields;
		let pic = files.pic[0].path;
		ConnectDbAdd('productlist', {
			title,
			price,
			fee,
			description,
			pic
		}, (err, data) => {
			if (err) {
				console.log('err: ', err);
			} else {
				res.redirect('/product')
			}
		})
	});
})
// 编辑商品列表
app.get('/productedit', (req, res) => {
	ConnectDbFind('productlist', {
		"_id": new ObjectId(req.query.id)
	}, (error, data) => {
		if (error) {
			console.log('数据错误', error)
			return
		}
		res.render('edit', {
			list: data
		})
	});
})
// 修改商品
app.post('/doproductedit', (req, res) => {
	let form = new multiparty.Form();
	form.uploadDir = 'upload'; // 上传图片保存地址 必须存在
	form.parse(req, function (err, fields, files) {
		// files // 上传成功地址
		// fields // 表单数据
		let id = fields._id[0]
		let {
			title,
			price,
			fee,
			description
		} = fields;
		let arr = {
			title,
			price,
			fee,
			description,
		};
		if (files.pic[0].originalFilename !== '') {
			arr.pic = files.pic[0].path
		} else {
			fs.unlink(files.pic[0].path)
		}
		ConnectDbEdit('productlist', {
			"_id": new ObjectId(id)
		}, arr, (err, data) => {
			if (err) {
				console.log('err: ', err);
			} else {
				res.redirect('/product')
			}
		})
	});
})
// 删除商品列表
app.get('/productdelete', (req, res) => {
	ConnectDbDeleteOne('productlist', {
		"_id": new ObjectId(req.query.id)
	}, (error, data) => {
		if (error) {
			console.log('数据错误', error)
			return
		}
		res.redirect('/product')
	})
	// res.render('delete')
})
// 监听端口
app.listen(3000, '127.0.0.1')
