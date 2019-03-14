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
        }, ctx.helper.jwtSlot, {
          expiresIn: '10 days'
        });

        ctx.body = ctx.helper.loginSuccess('登录成功!',token, manageUser.username, manageUser.Id);

      } else {
        //密码错误
        ctx.body = ctx.helper.failure('密码错误!');
      }
    } else {
      //用户不存在
      ctx.body = ctx.helper.failure('用户不存在!');
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
      ctx.body = ctx.helper.success('创建成功!');
    }
    else{
      ctx.body = ctx.helper.success('创建失败!');
    }
  }

  async checkToken(){
    const ctx = this.ctx;
    let token = ctx.params.token;

    let decoded; //解码token
    try {
      decoded = jwt.verify(token, ctx.helper.jwtSlot);
      ctx.body = ctx.helper.success('成功!');
    } catch (error) {
      if (error.name == 'TokenExpiredError') {
        ctx.status = 402;
        ctx.body = ctx.helper.failure('token失效!');
      } else {
        ctx.status = 401;
        ctx.body = ctx.helper.failure(error.name);
        return;
      }
    }
  }
}

module.exports = ManageUserController;
