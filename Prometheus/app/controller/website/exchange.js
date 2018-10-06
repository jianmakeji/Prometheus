'use strict';

const Controller = require('egg').Controller;

class ExchangeController extends Controller {
  
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };
    ctx.body = await ctx.service.exchange.list(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.exchange.find(ctx.helper.parseInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const exchange = await ctx.service.exchange.create(ctx.request.body);
    ctx.body = ctx.app.success('创建成功!');
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const updates = {
      userId: ctx.request.body.userId,
      special_column: ctx.request.body.special_column,
      price: ctx.request.body.price,
    };
    await ctx.service.exchange.update({ id, updates });
    ctx.body = ctx.app.success('更新成功!');
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    await ctx.service.exchange.del(id);
    ctx.body = ctx.app.success('删除成功!');
  }
}

module.exports = ExchangeController;
