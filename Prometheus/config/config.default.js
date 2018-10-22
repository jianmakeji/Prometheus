'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1537598392692_2118';

  // add your config here
  config.middleware = [ 'errorHandler' ];

  config.errorHandler = {
    match: '/api',
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '192.168.3.110',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'Prometheus',
    define: {
      freezeTableName: true,
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci',
      },
      timestamps: false,
    },
    pool: {
      max: 5,
      min: 1,
      acquire: 30000,
      idle: 10000
    },
  };

  config.security = {
    csrf:{
      enable:false,
      ignoreJSON:true
    },
    domainWhiteList: ['*']
  };

  config.cors = {
      origin:'*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
/*
  config.alinode = {
      server: 'wss://agentserver.node.aliyun.com:8080',
      appid: '76360',
      secret: 'f397191612454ecc74cbc4ac26ddf34478d2bcc6'
  }
*/
  return config;
};
