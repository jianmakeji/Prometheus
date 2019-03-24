'use strict';

const Service = require('egg').Service;

class SpecialCourse extends Service {
  async list({ offset = 0, limit = 10, specialColumnId = 0, thumbName = 'thumb_600_600' }) {
    let resultObj = await this.ctx.model.SpecialCourse.getSpecialCourseByPage({
      offset,
      limit,
      specialColumnId
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

  async find({id = 0,thumbName= 'thumb_600_600'}) {
    let transaction;
    try {
      transaction = await this.ctx.model.transaction();
      const course = await this.ctx.model.SpecialCourse.getSpecialCourseById(id,transaction);
      if (!course) {
        this.ctx.throw(404, 'course not found');
      }
      const helper = this.ctx.helper;
      course.videoAddress = helper.signatureUrl(helper.courseVideoPath + course.videoAddress);
      if(course.qrCode){
        course.qrCode = helper.signatureUrl(helper.qrCodePath + course.qrCode);
      }
      await this.ctx.model.SpecialCourse.addLookingNum(id,transaction);
      await transaction.commit();
      return course;
    } catch (e) {
      await transaction.rollback();
      return false;
    }
  }

  async create(course) {
    return this.ctx.model.SpecialCourse.createSpecialCourse(course);
  }

  async update({ id, updates }) {
    const course = await this.ctx.model.SpecialCourse.updateSpecialCourse({ id, updates });
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
      const course = await this.ctx.model.SpecialCourse.deleteSpecialCourseById(id,transaction);
      await this.ctx.model.Favorite.delFavoriteByCourseId(course.Id, 1, transaction);
      const helper = this.ctx.helper;
      let delArray = new Array();
      delArray.push(helper.courseVideoPath + course.videoAddress);
      if (course.qrCode){
          delArray.push(helper.qrCodePath + course.qrCode);
      }
      await helper.deleteOssMultiObject(delArray);
      await transaction.commit();
      return true;
    } catch (e) {
      console.log(e);
      await transaction.rollback();
      return false;
    }
  }

  async getSpecialCourseBySpecialColumnId({id = 0, limit = 50, offset =0, thumbName = 'thumb_600_600'}){
    let resultObj = await this.ctx.model.SpecialCourse.getSpecialCourseBySpecialColumnId({
      id,
      limit,
      offset
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

  async getSpecialCourseByCondition({courseType = 0,specialColumn = 0,limit = 10, offset =0, thumbName = 'thumb_600_600'}){

    let resultObj = await this.ctx.model.SpecialCourse.getSpecialCourseByCondition({courseType,specialColumn,limit,offset});

    const helper = this.ctx.helper;

    resultObj.rows.forEach((element, index)=>{
      element.videoAddress = helper.signatureUrl(helper.courseVideoPath + element.videoAddress);
      if(element.qrCode){
        element.qrCode = helper.signatureUrl(helper.qrCodePath + element.qrCode);
      }
    });

    return resultObj;
  }

  async searchByKeywords({ offset = 0, limit = 10, keyword='', thumbName = 'thumb_600_600' }){
    let resultObj = await this.ctx.model.SpecialCourse.searchByKeywords({offset,limit,keyword});

    const helper = this.ctx.helper;
    resultObj.rows.forEach((element, index)=>{
      element.videoAddress = helper.signatureUrl(helper.courseVideoPath + element.videoAddress);
      if(element.qrCode){
        element.qrCode = helper.signatureUrl(helper.qrCodePath + element.qrCode);
      }
    });

    return resultObj;
  }

  async updateQRCodeBySpecialCourseId(id,qrCode){
    return await this.ctx.model.SpecialCourse.updateQRCodeBySpecialCourseId(id,qrCode);
  }

  async findSpecialCourseObjById(id){
    const course = await this.ctx.model.SpecialCourse.findSpecialCourseObjById(id);
    return course;
  }

}

module.exports = SpecialCourse;
