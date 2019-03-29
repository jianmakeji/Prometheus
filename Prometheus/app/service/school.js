'use strict';

const Service = require('egg').Service;

class School extends Service {
  async list({ offset = 0, limit = 10,thumbName= 'thumb_330_150' }) {
    let resultObj = await this.ctx.model.School.getSchoolByPage({
      offset,
      limit,
      thumbName});

    const helper = this.ctx.helper;
    
    resultObj.rows.forEach((element, index)=>{
        element.bg = helper.signatureUrl(helper.articleImagePath + element.bg, thumbName);

    });

    return resultObj;
  }

  async find({id = 0,thumbName= 'thumb_600_600'}) {
    const school = await this.ctx.model.School.getSchoolById(id);
    const helper = this.ctx.helper;
    school.bg = helper.signatureUrl(helper.articleImagePath + school.bg,  thumbName);
    return school;
  }

  async create(school){
      return await this.ctx.model.School.createSchool(school);
  }

  async updateSchool({id,updates}) {
    return this.ctx.model.School.updateSchool({id,updates});
  }

  async del(id) {
    const school = await this.ctx.model.School.getSchoolById(id);
    if (!school) {
      this.ctx.throw(404, 'school not found');
    }
    const helper = this.ctx.helper;
    await helper.deleteOssObject(helper.articleImagePath + school.bg);

    return await this.ctx.model.School.deleteSchool(id);
  }

}

module.exports = School;
