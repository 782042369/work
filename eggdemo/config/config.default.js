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
    key: 'yang_ad_ms_se',
    maxAge: 1800 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
  };
  // add your middleware config here
  config.middleware = [
    'compress',
    'adminauth'
  ];
  config.adminauth = {
    match: '/admin'
  }
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['http://localhost:8080']
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
  config.compress = {
    threshold: 1024 // body大于配置的threshold才会压缩
  }
  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: '521yhx521',
      // database
      database: 'egg',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/egg',
      options: {},
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
