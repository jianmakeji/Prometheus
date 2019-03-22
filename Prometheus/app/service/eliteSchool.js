'use strict';

const Service = require('egg').Service;

class EliteSchool extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.EliteSchool.getEliteSchoolByPage({
      offset,
      limit,
      });
  }

  async find(id) {
    const school = await this.ctx.model.EliteSchool.getEliteSchoolById(id);
    return school;
  }

  async createEliteSchool(eliteSchool){
    await this.ctx.model.EliteSchool.createEliteSchool(eliteSchool);
  }

  async updateEliteSchool({id,updates}) {
    return this.ctx.model.EliteSchool.updateEliteSchool({id,updates});
  }
  
  async del(id) {
    return await this.ctx.model.EliteSchool.deleteEliteSchool(id);
  }
}

module.exports = EliteSchool;
