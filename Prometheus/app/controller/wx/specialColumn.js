'use strict';

const Controller = require('egg').Controller;

class SpecialColumnController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      thumbName:ctx.query.thumbName,
    };
    ctx.body = await ctx.service.specialColumn.list(query);
  }

  async show() {
    const ctx = this.ctx;
    let query = {
      id:ctx.helper.parseInt(ctx.params.id),
      thumbName:ctx.query.thumbName,
      userId:ctx.helper.parseInt(ctx.query.userId),
    };

    try{
      ctx.body = await ctx.service.specialColumn.findByUserId(query);
    }
    catch(e){
      ctx.body = ctx.helper.failure('数据请求失败!');
    }
  }

  async getSpecialColumnsByTeacherId(){
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      id: ctx.helper.parseInt(ctx.query.id),
      thumbName:ctx.query.thumbName,
    };
    ctx.body = await ctx.service.specialColumn.getSpecialColumnsByTeacherId(query);
  }

  async getRecommendSpecialColumn(){
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      thumbName: ctx.query.thumbName,
    };

    ctx.body = await ctx.service.specialColumn.getRecommendSpecialColumn(query);
  }
}

module.exports = SpecialColumnController;
