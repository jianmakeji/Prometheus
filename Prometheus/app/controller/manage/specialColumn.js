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
    const query = {
      id: ctx.helper.parseInt(ctx.params.id),
      thumbName: ctx.query.thumbName,
    };
    ctx.body = await ctx.service.specialColumn.find(query);
  }

  async create() {
    const ctx = this.ctx;
    try{
      const specialColumn = await ctx.service.specialColumn.create(ctx.request.body);
      ctx.body = ctx.helper.success('创建成功!');
    }
    catch(e){
      ctx.body = ctx.helper.failure(e.message);
    }

  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const updates = {
      name: ctx.request.body.name,
      schoolId: ctx.request.body.schoolId,
      teacherId: ctx.request.body.teacherId,
      subject: ctx.request.body.subject,
      thumb: ctx.request.body.thumb,
      describe: ctx.request.body.describe,
      price: ctx.request.body.price,
      grade:ctx.request.body.grade,
      briefImages:ctx.request.body.briefImages,
      recommend:ctx.request.body.recommend,
      poster:ctx.request.body.poster
    };
    try{
      await ctx.service.specialColumn.update({ id, updates });
      ctx.body = ctx.helper.success('更新成功!');
    }
    catch(e){
      ctx.body = ctx.helper.failure(e.message);
    }

  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    try{
      await ctx.service.specialColumn.del(id);
      ctx.body = ctx.helper.success('删除成功!');
    }
    catch(e){
      ctx.body = ctx.helper.failure(e.message);
    }

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

}

module.exports = SpecialColumnController;
