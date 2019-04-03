'use strict';

const Controller = require('egg').Controller;

class EliteSchoolController extends Controller {
  async downloadByCondition() {
    const ctx = this.ctx;
    const query = {
      offset: ctx.helper.parseInt(ctx.query.offset),
      limit: ctx.helper.parseInt(ctx.query.limit),
      schoolId: ctx.helper.parseInt(ctx.query.schoolId),
      grade: ctx.helper.parseInt(ctx.query.grade),
      subject: ctx.helper.parseInt(ctx.query.subject),
    };

    ctx.body = await ctx.service.eliteSchool.downloadByCondition(query);
  }
}

module.exports = EliteSchoolController;
