import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

export default (appInfo: EggAppInfo) => {
	const config = {} as PowerPartial<EggAppConfig>

	// override config from framework / plugin
	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1559532873843_1986'

	// add your egg config in here
	config.middleware = []
	config.session = {
		key: 'xiaoxiannv',
		maxAge: 1800000, // 1 天
		httpOnly: true,
		encrypt: true
	}
	// add your middleware config here
	config.middleware = [ 'compress', 'adminauth' ]
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
	config.multipart = {
		files: 50, // body大于配置的threshold才会压缩
		fields: 50 // body大于配置的threshold才会压缩
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
