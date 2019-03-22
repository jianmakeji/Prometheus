'use strict';

const Controller = require('egg').Controller;

class SpecialCourseController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      thumbName:ctx.query.thumbName,
    };
    ctx.body = await ctx.service.specialCourse.list(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.specialCourse.find({id:ctx.helper.parseInt(ctx.params.id)});
  }

  async getSpecialCourseBySpecialColumnId(){
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      id: ctx.params.id,
      thumbName:ctx.query.thumbName,
    };
    ctx.body = await ctx.service.specialCourse.getSpecialCourseBySpecialColumnId(query);
  }

  async getSpecialCourseByCondition(){
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      courseType: ctx.helper.parseInt(ctx.query.courseType),
      specialColumn: ctx.helper.parseInt(ctx.query.specialColumn),
      thumbName:ctx.query.thumbName,
    };
    ctx.body = await ctx.service.specialCourse.getSpecialCourseByCondition(query);
  }

  async searchByKeywords() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      keyword:ctx.query.keyword,
      thumbName:ctx.query.thumbName,
    };
    ctx.body = await ctx.service.specialCourse.searchByKeywords(query);
  }
}

module.exports = SpecialCourseController;
