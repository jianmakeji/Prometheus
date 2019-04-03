'use strict';

const Service = require('egg').Service;

class SpecialColumn extends Service {
  async list({ offset = 0, limit = 10, thumbName = 'thumb_330_225' }) {
    let resultObj = await this.ctx.model.SpecialColumn.getSpecialColumnByPage({
      offset,
      limit
    });

    const helper = this.ctx.helper;

    resultObj.rows.forEach((element, index)=>{
      element.thumb = helper.signatureUrl(helper.courseImagePath + element.thumb, thumbName);

    });

    return resultObj;
  }

  async find({id = 0,thumbName= 'thumb_330_225'}) {
    const specialColumn = await this.ctx.model.SpecialColumn.getSpecialColumnById(id);

    if (!specialColumn) {
      this.ctx.throw(404, 'specialColumn not found');
    }

    let posterImage;

    const helper = this.ctx.helper;
    specialColumn.thumb = helper.signatureUrl(helper.courseImagePath + specialColumn.thumb,  thumbName);
    specialColumn.teacher.avatar = helper.signatureUrl(helper.articleImagePath + specialColumn.teacher.avatar, "thumb_80_80");

    if(specialColumn.briefImages != null && specialColumn.briefImages != ''){
      let briefImages = specialColumn.briefImages.split(',');
      let singImages = '';
      if(briefImages.length > 0){
        briefImages.forEach((element, index)=>{
            singImages = singImages + helper.signatureUrl(helper.courseImagePath + element, posterImage) + ',';
        })
        specialColumn.briefImages = singImages;
      }
    }

    if (specialColumn.recommend == 1 ){
       specialColumn.poster = helper.signatureUrl(helper.courseImagePath + specialColumn.poster, posterImage);
    }
    return specialColumn;
  }

  async create(specialColumn) {
    return this.ctx.model.SpecialColumn.create(specialColumn);
  }

  async update({ id, updates }) {
    const specialColumn = await this.ctx.model.SpecialColumn.findById(id);
    if (!specialColumn) {
      this.ctx.throw(404, 'specialColumn not found');
    }
    return specialColumn.update(updates);
  }

  async del(id) {
    const specialColumn = await this.ctx.model.SpecialColumn.findById(id);
    if (!specialColumn) {
      this.ctx.throw(404, 'specialColumn not found');
    }

    const helper =this.ctx.helper;
    await helper.deleteOssObject(helper.courseImagePath + specialColumn.thumb);

    return specialColumn.destroy();
  }

  async getSpecialColumnsByTeacherId({id = 0, limit = 10, offset =0, thumbName = 'thumb_330_225'}){
    const resultObj =  this.ctx.model.SpecialColumn.getSpecialColumnsByTeacherId({id,offset,limit});

    const helper = this.ctx.helper;

    resultObj.rows.forEach((element, index)=>{
      element.thumb = helper.signatureUrl(helper.courseImagePath + element.thumb, thumbName);
    });

    return resultObj;
  }

  async getRecommendSpecialColumn({limit = 12, thumbName = 'thumb_330_528'}){
    const resultObj =  await this.ctx.model.SpecialColumn.getRecommendSpecialColumn(limit);

    const helper = this.ctx.helper;

    resultObj.forEach((element, index)=>{
      element.poster = helper.signatureUrl(helper.courseImagePath + element.poster, thumbName);
    });

    return resultObj;
  }

  async downloadByCondition(query) {
    const resultObj =  await this.ctx.model.SpecialColumn.downloadByCondition(query);

    const helper = this.ctx.helper;

    resultObj.forEach((element, index)=>{
      element.downloadFile = helper.signatureUrl(helper.downloadFile + element.downloadFile);
    });

    return resultObj;
  }
}

module.exports = SpecialColumn;
