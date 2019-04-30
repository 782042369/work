/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1555663231382_6385';
  config.session = {
    key: 'EGG_SESS',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
  };
  // add your middleware config here
  config.middleware = [
    // 'printdate',
    'compress',
    // 'authAdmin'
    // 'forbidip',
    // 'auth'
  ];
  config.authAdmin = {
    match: '/admin'
  }
  config.compress = {
    threshold: 1024 // body大于配置的threshold才会压缩
  }
  config.forbidip = {
    forbidips: [
      '127.0.0.1',
      '192.168.58.45'
    ]
  }
  config.mongo = {
    client: {
      host: '127.0.0.1',
      port: '27017',
      name: 'egg',
      user: '',
      password: '',
      options: {},
    },
  };
  config.auth = {
    title: 'this title'
  }
  // 配置模版引擎
  config.view = {
    mapping: {
      '.ejs': 'ejs',
    },
  };
  // 配置 公共url 
  config.url = 'www.phonegap100.com/';
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return config;
};
