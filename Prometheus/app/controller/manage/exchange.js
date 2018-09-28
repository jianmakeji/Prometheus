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
    ctx.status = 201;
    ctx.body = exchange;
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const updates = {
      title: ctx.request.body.title,
      content: ctx.request.body.content,
    };
    ctx.body = await ctx.service.exchange.update({ id, updates });
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    await ctx.service.exchange.del(id);
    ctx.status = 200;
  }
}

module.exports = ExchangeController;
