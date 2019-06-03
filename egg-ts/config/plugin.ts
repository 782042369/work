import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
	mongoose: {
		enable: true,
		package: 'egg-mongoose',
	},
	mysql: {
		enable: true,
		package: 'egg-mysql',
	},
	cors: {
		enable: true,
		package: 'egg-cors',
	},
	redis: {
		enable: true,
		package: 'egg-redis',
	},
};

export default plugin;
