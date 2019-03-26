'use strict';

const Controller = require('egg').Controller;
const request = require('request');
const wxUtil = require('../../util/wxUtils');

class EliteCourseController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };
    ctx.body = await ctx.service.eliteCourse.list(query);
  }

  async show() {
    const ctx = this.ctx;

    ctx.body = await ctx.service.eliteCourse.find(ctx.helper.parseInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    try{
      const course = await ctx.service.eliteCourse.create(ctx.request.body);
      ctx.body = ctx.helper.success('创建成功!');
    }
    catch(e){
      ctx.body = ctx.helper.failure(e.message);
    }
  }

  async getEliteCourseByEliteSchoolId(){
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      id: ctx.helper.parseInt(ctx.query.id),
    };
    ctx.body = await ctx.service.eliteCourse.getEliteCourseByEliteSchoolId(query);
  }

  async searchByKeywords() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      keyword:ctx.query.keyword,
      thumbName:ctx.query.thumbName,
    };
    ctx.body = await ctx.service.eliteCourse.searchByKeywords(query);
  }
}

module.exports = EliteCourseController;
