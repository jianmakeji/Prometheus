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

  async getSpecialColumnsByTeacherId(){
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      id: ctx.params.id,
    };
    ctx.body = await ctx.service.specialColumn.getSpecialColumnsByTeacherId(query);
  }

  async getSpecialColumnsByCourseType(){
    const ctx = this.ctx;
    const query = {
      courseType: ctx.query.courseType,
    };
    ctx.body = await ctx.service.specialColumn.getSpecialColumnsByCourseType(query);
  }
}

module.exports = SpecialColumnController;
