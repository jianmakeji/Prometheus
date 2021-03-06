'use strict';

const Controller = require('egg').Controller;

class EliteSchoolController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      offset: ctx.helper.parseInt(ctx.query.offset),
      limit: ctx.helper.parseInt(ctx.query.limit),
      schoolId: ctx.helper.parseInt(ctx.query.schoolId),
      grade: ctx.helper.parseInt(ctx.query.grade),
      subject: ctx.helper.parseInt(ctx.query.subject),
    };

    ctx.body = await ctx.service.eliteSchool.getEliteSchoolByPage(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.eliteSchool.find(ctx.helper.parseInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    try{
      const comment = await ctx.service.eliteSchool.createEliteSchool(ctx.request.body);
      ctx.body = ctx.helper.success('创建成功!');
    }
    catch(e){
      ctx.body = ctx.helper.failure(e.message);
    }

  }

  async update(){
    const ctx = this.ctx;
    const id = ctx.params.id;
    const updates = {
      name: ctx.request.body.name,
      schoolId: ctx.request.body.schoolId,
      grade: ctx.request.body.grade,
      subject: ctx.request.body.subject,
      downloadFile: ctx.request.body.downloadFile,
    };
    try{
      await ctx.service.eliteSchool.updateEliteSchool({ id, updates });
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
      await ctx.service.eliteSchool.del(id);
      ctx.body = ctx.helper.success('删除成功!');
    }
    catch(e){
      ctx.body = ctx.helper.failure(e.message);
    }
  }

  async getEliteSchoolName() {
    const ctx = this.ctx;
    const query = {
      schoolId: ctx.helper.parseInt(ctx.query.schoolId),
      grade: ctx.helper.parseInt(ctx.query.grade),
      subject: ctx.helper.parseInt(ctx.query.subject),
    };

    ctx.body = await ctx.service.eliteSchool.getEliteSchoolName(query);
  }

}

module.exports = EliteSchoolController;
