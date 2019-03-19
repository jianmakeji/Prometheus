'use strict';

const Controller = require('egg').Controller;
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const request = require('request');
const fs = require('fs');

class UserController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };
    ctx.body = await ctx.service.user.list(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.user.find(ctx.helper.parseInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    try {
      const user = await ctx.service.user.create(ctx.request.body);
      let jwt = require('jsonwebtoken');
      let token = jwt.sign({
        username: user.nickName,
        openId: user.openId
      }, ctx.helper.jwtSlot, {
        expiresIn: '100 days'
      });
      ctx.body = ctx.helper.loginSuccess('登录成功!', token, user.username, user.Id);
    } catch (error) {
      ctx.body = ctx.helper.failure(error);
    }
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const updates = {
      headicon: ctx.request.body.headicon,
      password: ctx.request.body.password,
    };
    try{
      await ctx.service.user.update({
        id,
        updates
      });
      ctx.body = ctx.helper.success('更新成功!');
    }
    catch(e){
      ctx.body = ctx.helper.failure(e.message);
    }

  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    try{
      await ctx.service.user.del(id);
      ctx.body = ctx.helper.success('删除成功!');
    }
    catch(e){
      ctx.body = ctx.helper.failure(e.message);
    }

  }

  async getWxCode() {
    const ctx = this.ctx;
    const jscode = ctx.query.jscode;

    const requestUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=wx781d229c4c3bd932&secret=8c05c4d7e9970ca9cd1520fd8b857572&js_code=${jscode}&grant_type=authorization_code`;

    const resultObj = await request(requestUrl, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        return body;
      } else {
        return error;
      }
    });
    ctx.body = resultObj;
  }
}

module.exports = UserController;
