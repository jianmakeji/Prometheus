'use strict';

const Controller = require('egg').Controller;
const crypto = require("crypto");

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }

  async login() {
    const ctx = this.ctx;
    let name = ctx.query.username;
    let password = ctx.query.password;

    let md5 = crypto.createHash("md5");
    let newPas = md5.update(password).digest("hex");

    const manageUser = await ctx.service.ManageUser.findByUserName(name);

    if (manageUser) {
      if (manageUser.password === newPas) {
        //登录成功
        let jwt = require('jsonwebtoken');
        let token = jwt.sign({
          user_id: 1,
          user_name: '张三'
        }, '自定义签名盐值', {
          expiresIn: '60s' //时间根据自己定，具体可参考jsonwebtoken插件官方说明
        });
        this.ctx.cookies.set('token', token, {
          maxAge: 60 * 1000,
          httpOnly: false,
          overwrite: true,
          signed: false
        });
        this.ctx.body = true;
      } else {
        //密码错误
      }
    } else {
      //用户不存在
    }

  }

  async registerManageUser() {
    const ctx = this.ctx;
    let name = ctx.query.username;
    let password = ctx.query.password;
    let md5 = crypto.createHash("md5");
    let newPas = md5.update(password).digest("hex");

    const manageUser = await ctx.service.ManageUser.findByUserName({
      username:name,
      password:newPas,
    });
    
    if (manageUser){
      ctx.body = ctx.app.success('创建成功!');
    }
    else{
      ctx.body = ctx.app.success('创建失败!');
    }
  }
}

module.exports = HomeController;
