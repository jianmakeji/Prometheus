'use strict';

const Service = require('egg').Service;

class School extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.School.getSchoolByPage({
      offset,
      limit,
      });
  }

  async find(id) {
    const school = await this.ctx.model.School.getSchoolById(id);
    return school;
  }

  async create(school){
      return await this.ctx.model.School.createSchool(school);
  }

  async updateSchool({id,updates}) {
    return this.ctx.model.School.updateSchool({id,updates});
  }

  async getCommentByCourseId({ offset = 0, limit = 10, courseId = 0}){
    return this.ctx.model.School.getCommentByCourseId({offset,limit,courseId});
  }

  async del(id) {
    return await this.ctx.model.School.deleteSchool(id);
  }

}

module.exports = School;
