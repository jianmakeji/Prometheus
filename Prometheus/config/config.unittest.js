'use strict';

exports.sequelize = {
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
  },
};
