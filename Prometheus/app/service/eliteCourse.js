'use strict';

const Service = require('egg').Service;

class EliteCourse extends Service {
  async list({ offset = 0, limit = 10, eliteSchoolId = 0}) {
    let resultObj = await this.ctx.model.EliteCourse.getEliteCourseByPage({
      offset,
      limit,
      eliteSchoolId
    });

    const helper = this.ctx.helper;
    resultObj.rows.forEach((element, index)=>{
      element.videoAddress = helper.signatureUrl(helper.courseVideoPath + element.videoAddress);
      if(element.qrCode){
        element.qrCode = helper.signatureUrl(helper.qrCodePath + element.qrCode);
      }
    });

    return resultObj;

  }

  async find(id) {

    let transaction;
    try {
      transaction = await this.ctx.model.transaction();

      const eliteCourse = await this.ctx.model.EliteCourse.getEliteCourseById(id,transaction);
      if (!eliteCourse) {
        this.ctx.throw(404, 'eliteCourse not found');
      }

      const helper = this.ctx.helper;
      eliteCourse.videoAddress = helper.signatureUrl(helper.courseVideoPath + eliteCourse.videoAddress);
      if(eliteCourse.qrCode){
        eliteCourse.qrCode = helper.signatureUrl(helper.qrCodePath + eliteCourse.qrCode);
      }
      eliteCourse.teacher.avatar = helper.signatureUrl(helper.articleImagePath + eliteCourse.teacher.avatar);
      await this.ctx.model.EliteCourse.addLookingNum(id,transaction);
      await transaction.commit();
      return eliteCourse;
    } catch (e) {
      console.log(e);
      await transaction.rollback();
      return false;
    }
  }

  async create(comment) {
    return this.ctx.model.EliteCourse.createEliteCourse(comment);
  }

  async updateEliteCourse({id, updates}){
    const course = await this.ctx.model.EliteCourse.updateEliteCourse({ id, updates });
    const helper =this.ctx.helper;
    let deleteArray = new Array();
    if (updates.videoAddress != course.videoAddress){
      deleteArray.push(helper.courseVideoPath + course.videoAddress);
    }
    if (updates.thumb != course.thumb){
      deleteArray.push(helper.courseImagePath + course.thumb);
    }

    if (deleteArray.length > 0){
      await helper.deleteOssMultiObject(deleteArray);
    }

    return course.update(updates);
  }

  async del(id) {

    let transaction;
    try {
      transaction = await this.ctx.model.transaction();
      const course = await this.ctx.model.EliteCourse.deleteEliteCourseById(id,transaction);

      await this.ctx.model.Favorite.delFavoriteByCourseId(course.Id, 2, transaction);
      const helper =this.ctx.helper;
      let delArray = new Array();
      delArray.push(helper.courseVideoPath + course.videoAddress);
      if (course.qrCode){
          delArray.push(helper.qrCodePath + course.qrCode);
      }
      await helper.deleteOssMultiObject(delArray);
      await transaction.commit();
      return true;
    } catch (e) {
      await transaction.rollback();
      return false;
    }
  }

  async getEliteCourseByEliteSchoolId({id = 0, limit = 50, offset =0}){

    let resultObj = await this.ctx.model.EliteCourse.getEliteCourseByEliteSchoolId({id,limit,offset});

    const helper = this.ctx.helper;
    resultObj.rows.forEach((element, index)=>{
      element.videoAddress = helper.signatureUrl(helper.courseVideoPath + element.videoAddress);
      if(element.qrCode){
        element.qrCode = helper.signatureUrl(helper.qrCodePath + element.qrCode);
      }
    });

    return resultObj;
  }

  async searchByKeywords({ offset = 0, limit = 10, keyword=''}){
    let resultObj = await this.ctx.model.EliteCourse.searchByKeywords({offset,limit,keyword});

    const helper = this.ctx.helper;
    resultObj.rows.forEach((element, index)=>{
      element.videoAddress = helper.signatureUrl(helper.courseVideoPath + element.videoAddress);
      if(element.qrCode){
        element.qrCode = helper.signatureUrl(helper.qrCodePath + element.qrCode);
      }
    });

    return resultObj;
  }

  async updateQRCodeByEliteCourseId(id,qrCode){
    return await this.ctx.model.EliteCourse.updateQRCodeByEliteCourseId(id,qrCode);
  }

  async findEliteCourseObjById(id){
    const eliteCourse = await this.ctx.model.EliteCourse.findEliteCourseObjById(id);
    return eliteCourse;
  }

}

module.exports = EliteCourse;
