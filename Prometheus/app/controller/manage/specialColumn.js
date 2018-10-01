'use strict';

const Controller = require('egg').Controller;

class SpecialColumnController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };
    ctx.body = await ctx.service.specialColumn.list(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.specialColumn.find(ctx.helper.parseInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const post = await ctx.service.specialColumn.create(ctx.request.body);
    ctx.body = ctx.app.success('创建成功!');
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const updates = {
      name: ctx.request.body.name,
      courseType: ctx.request.body.courseType,
      teacherId: ctx.request.body.teacherId,
      thumb: ctx.request.body.thumb,
      describe: ctx.request.body.describe,
      price: ctx.request.body.price,
    };
    await ctx.service.specialColumn.update({ id, updates });
    ctx.body = ctx.app.success('更新成功!');
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    await ctx.service.specialColumn.del(id);
    ctx.body = ctx.app.success('删除成功!');
  }
}

module.exports = SpecialColumnController;
