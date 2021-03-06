'use strict';

const Service = require('egg').Service;

class EliteSchool extends Service {

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

  async getEliteSchoolByPage({offset = 0, limit = 10, schoolId = 0, grade = 0, subject = 0}){
    return await this.ctx.model.EliteSchool.getEliteSchoolByPage({offset, limit, schoolId, grade, subject});
  }

  async downloadByCondition({offset = 0, limit = 10, schoolId = 0, grade = 0, subject = 0}){
    const resultObj = await this.ctx.model.EliteSchool.getEliteSchoolByPage({offset, limit, schoolId, grade, subject});
    const helper = this.ctx.helper;

    resultObj.rows.forEach((element, index)=>{
      if (element.downloadFile != null){
          element.downloadFile = helper.signatureUrl(helper.downloadFile + element.downloadFile);
      }
    });

    return resultObj;
  }

  async getEliteSchoolName({schoolId = 0, grade = 0, subject = 0}){
    return await this.ctx.model.EliteSchool.getEliteSchoolName({schoolId, grade, subject});
  }
}

module.exports = EliteSchool;
