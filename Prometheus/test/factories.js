'use strict';

const { factory } = require('factory-girl');

module.exports = app => {

  app.factory = factory;

  factory.define('user', app.model.User, {
    username: factory.sequence('User.username', n => `name_${n}`),
    password: '1232131283213jjkjjkj',
    headicon: 'TYTUYQWEQWE.jpg',
  });

  factory.define('course', app.model.Course, {
    name: '解析几何',
    describe: '直角三角形，图，勾股定理',
    courseType: 1,
    specialColumn: 1,
    thumb: 'YUASDASD.jpg',
    videoAddress: 'RTSADSADSAD.mp4',
  });

  factory.define('courseType', app.model.CourseType, {
    name: '领先课堂',
    grade: '7',
    describe: '7年级领先课堂',
  });

  factory.define('exchange', app.model.Exchange, {
    userId: 1,
    special_column: 1,
    price: 190.00,
  });

  factory.define('specialColumn', app.model.SpecialColumn, {
    name: '专题突破',
    courseType: 1,
    teacherId: 1,
    thumb: 'TRS78AUSD.jpg',
    describe: '专题突破专栏',
    price: '198.00',
  });

  factory.define('article', app.model.Article, {
    name: '习近平来到查干湖',
    abstractContent: '9月26日下午，习近平从黑龙江齐齐哈尔乘火车抵达吉林省松原市。一下车，他就前往查干湖，了解生态保护和渔民捕捞作业情况。查干湖是我国十大淡水湖之一，渔产资源丰富。',
    mainContent: '9月26日下午，习近平从黑龙江齐齐哈尔乘火车抵达吉林省松原市。一下车，他就前往查干湖，了解生态保护和渔民捕捞作业情况。查干湖是我国十大淡水湖之一，渔产资源丰富。',
    thumb: 'NKJHBNBH7878.jpg',
  });

  factory.define('teacher', app.model.Teacher, {
    name: '陈老师',
    subject: '数学',
    brief: '10年中小学教学经验',
    thumb: 'TRS78AUSD.jpg',
  });
};
