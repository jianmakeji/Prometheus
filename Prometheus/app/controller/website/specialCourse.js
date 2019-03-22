'use strict';

const Controller = require('egg').Controller;

class SpecialCourseController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };
    ctx.body = await ctx.service.specialCourse.list(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.specialCourse.find(ctx.helper.parseInt(ctx.params.id));
  }

  async getCourseBySpecialColumnId(){
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      id: ctx.params.id,
    };
    ctx.body = await ctx.service.specialCourse.getCourseBySpecialColumnId(query);
  }

  async getCourseByCondition(){
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      courseType: ctx.helper.parseInt(ctx.query.courseType),
      specialColumn: ctx.helper.parseInt(ctx.query.specialColumn),
    };
    ctx.body = await ctx.service.specialCourse.getCourseByCondition(query);
  }

}

module.exports = SpecialCourseController;
