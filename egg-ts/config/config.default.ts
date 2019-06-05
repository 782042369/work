import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

export default (appInfo: EggAppInfo) => {
	const config = {} as PowerPartial<EggAppConfig>
	// override config from framework / plugin
	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1559532873843_1986'
	// add your egg config in here
	config.session = {
		key: 'xiaoxiannv',
		maxAge: 1800000, // 1 天
		httpOnly: true,
		encrypt: true
	}
	config.middleware = [ 'compress', 'adminauth', 'graphql' ]
	config.uploadfile = 'app/public/admin/upload'
	config.adminauth = {
		match: '/admin'
	}
	config.redis = {
		Redis: require('ioredis'), // customize ioredis version, only set when you needed
		client: {
			port: 6379, // Redis port
			host: '127.0.0.1', // Redis host
			password: '',
			db: 0
		}
	}
	config.security = {
		csrf: {
			enable: false,
			ignoreJSON: true
		},
		domainWhiteList: [ 'http://127.0.0.1:3000' ]
	}
	config.logger = {
		encoding: 'gbk',
		outputJSON: true
	}
	config.cors = {
		origin: 'http://127.0.0.1:3000',
		credentials: true,
		allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
	}
	config.compress = {
		threshold: 1024 // body大于配置的threshold才会压缩
	}
	config.bodyParser = {
		enable: true,
		jsonLimit: '10mb'
	}
	config.multipart = {
		files: 50, // body大于配置的threshold才会压缩
		fields: 50 // body大于配置的threshold才会压缩
	}
	config.graphql = {
		router: '/graphql',
		// 是否加载到 app 上，默认开启
		// app: true,
		// 是否加载到 agent 上，默认关闭
		// agent: false,
		// 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
		graphiql: true
		//是否设置默认的Query和Mutation, 默认关闭
		// defaultEmptySchema: true
		// graphQL 路由前的拦截器
		// onPreGraphQL: function*(ctx) {},
		// 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
		// onPreGraphiQL: function*(ctx) {}
	}

	// config.mysql = {
	//   // database configuration
	//   client: {
	//     // host
	//     host: 'localhost',
	//     // port
	//     port: '3306',
	//     // username
	//     user: 'root',
	//     // password
	//     password: '521yhx521',
	//     // database
	//     database: 'egg',
	//   },
	//   // load into app, default is open
	//   app: true,
	//   // load into agent, default is close
	//   agent: false,
	// };
	config.alinode = {
		server: 'wss://agentserver.node.aliyun.com:8080',
		appid: '80097',
		secret: '6555a1ed3001ad62b5d783423f51bc4cf37c8a8c',
		logdir: '/tmp/'
		// error_log: [
		// 	'您的应用在业务层面产生的异常日志的路径，数组，可选，可配置多个',
		// 	'例如：/root/.logs/error.#YYYY#-#MM#-#DD#.log',
		// 	'不更改 Egg 默认日志输出路径可不配置本项目'
		// ]
	}
	config.mongoose = {
		client: {
			url: 'mongodb://127.0.0.1/egg_xiaomi',
			options: {}
		}
	}
	// 配置 公共url
	config.url = 'www.phonegap100.com/'
	// add your special config in here
	const bizConfig = {
		sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`
	}

	// the return config will combines to EggAppConfig
	return {
		...config,
		...bizConfig
	}
}
