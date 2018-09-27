'use strict';

const Controller = require('egg').Controller;

class TeacherController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };
    ctx.body = await ctx.service.teacher.list(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.teacher.find(ctx.helper.parseInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const teacher = await ctx.service.teacher.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = teacher;
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const updates = {
      title: ctx.request.body.title,
      content: ctx.request.body.content,
    };
    ctx.body = await ctx.service.teacher.update({ id, updates });
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    await ctx.service.teacher.del(id);
    ctx.status = 200;
  }
}

module.exports = TeacherController;
