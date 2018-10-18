'use strict';

const Controller = require('egg').Controller;

class CourseController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };
    ctx.body = await ctx.service.course.list(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.course.find(ctx.helper.parseInt(ctx.params.id));
  }

  async getCourseBySpecialColumnId(){
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      id: ctx.params.id,
    };
    ctx.body = await ctx.service.course.getCourseBySpecialColumnId(query);
  }

  async getCourseByCourseTypeId(){
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      id: ctx.params.id,
    };
    ctx.body = await ctx.service.course.getCourseByCourseTypeId(query);
  }

  async getCourseByCondition(){
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      courseType: ctx.helper.parseInt(ctx.query.courseType),
      specialColumn: ctx.helper.parseInt(ctx.query.specialColumn),
    };
    ctx.body = await ctx.service.course.getCourseByCondition(query);
  }

  async searchByKeywords() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      keyword:ctx.query.keyword,
    };
    ctx.body = await ctx.service.course.searchByKeywords(query);
  }
}

module.exports = CourseController;
