import { EggPlugin } from 'egg'

const plugin: EggPlugin = {
	mongoose: {
		enable: true,
		package: 'egg-mongoose'
	},
	mysql: {
		enable: true,
		package: 'egg-mysql'
	},
	cors: {
		enable: true,
		package: 'egg-cors'
	},
	redis: {
		enable: true,
		package: 'egg-redis'
	},
	graphql: {
		enable: true,
		package: 'egg-graphql'
	},
	alinode: {
		enable: true,
		package: 'egg-alinode'
	}
}

export default plugin
