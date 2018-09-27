'use strict';

const Controller = require('egg').Controller;

class CourseTypeController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };
    ctx.body = await ctx.service.courseType.list(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.courseType.find(ctx.helper.parseInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const courseType = await ctx.service.courseType.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = courseType;
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const updates = {
      title: ctx.request.body.title,
      content: ctx.request.body.content,
    };
    ctx.body = await ctx.service.courseType.update({ id, updates });
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    await ctx.service.courseType.del(id);
    ctx.status = 200;
  }
}

module.exports = CourseTypeController;
