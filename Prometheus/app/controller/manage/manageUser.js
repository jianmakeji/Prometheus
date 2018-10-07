'use strict';

const Controller = require('egg').Controller;
const crypto = require("crypto");
const jwt = require('jsonwebtoken');

class ManageUserController extends Controller {

  async login() {
    const ctx = this.ctx;
    let name = ctx.request.body.username;
    let password = ctx.request.body.password;

    let md5 = crypto.createHash("md5");
    let newPas = md5.update(password).digest("hex");

    const manageUser = await ctx.service.manageUser.findByUserName(name);

    if (manageUser && manageUser.length == 1) {
      if (manageUser[0].password === newPas) {
        //登录成功
        let jwt = require('jsonwebtoken');
        let token = jwt.sign({
          user_id: manageUser[0].Id,
          user_name: manageUser[0].username
        }, ctx.app.jwtSlot, {
          expiresIn: '10 days'
        });
        
        ctx.body = ctx.app.loginSuccess('登录成功!',token);;
      } else {
        //密码错误
        ctx.body = ctx.app.success('密码错误!');
      }
    } else {
      //用户不存在
      ctx.body = ctx.app.failure('用户不存在!');
    }

  }

  async registerManageUser() {
    const ctx = this.ctx;
    let name = ctx.request.body.username;
    let password = ctx.request.body.password;

    let md5 = crypto.createHash("md5");
    let newPas = md5.update(password).digest("hex");

    const manageUser = await ctx.service.manageUser.create({
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

module.exports = ManageUserController;
