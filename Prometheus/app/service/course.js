'use strict';

const Service = require('egg').Service;

class Course extends Service {
  async list({ offset = 0, limit = 10, thumbName = 'thumb_600_600' }) {
    let resultObj = await this.ctx.model.Course.getCourseByPage({
      offset,
      limit
    });

    const helper = this.ctx.helper;
    resultObj.rows.forEach((element, index)=>{
      element.thumb = helper.signatureUrl(helper.courseImagePath + element.thumb, thumbName);
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
      const course = await this.ctx.model.Course.getCourseById(id,transaction);
      if (!course) {
        this.ctx.throw(404, 'course not found');
      }
      const helper = this.ctx.helper;
      course.thumb = helper.signatureUrl(helper.courseImagePath + course.thumb, thumbName);
      course.videoAddress = helper.signatureUrl(helper.courseVideoPath + course.videoAddress);
      if(course.qrCode){
        course.qrCode = helper.signatureUrl(helper.qrCodePath + course.qrCode);
      }
      await this.ctx.model.Course.addLookingNum(id,transaction);
      await transaction.commit();
      return course;
    } catch (e) {
      console.log(e);
      await transaction.rollback();
      return false;
    }
  }

  async create(course) {
    return this.ctx.model.Course.createCourse(course);
  }

  async update({ id, updates }) {
    const course = await this.ctx.model.Course.updateCourse({ id, updates });
    const helper =this.ctx.helper;
    let deleteArray = new Array();
    if (updates.videoAddress != course.videoAddress){
      deleteArray.push(helper.courseVideoPath + course.videoAddress);
    }
    if (updates.thumb != course.thumb){
      deleteArray.push(helper.courseImagePath + course.thumb);
    }

    if (deleteArray.length > 0){
      await app.deleteOssMultiObject(deleteArray);
    }

    return course.update(updates);
  }

  async del(id) {
    let transaction;
    try {
      transaction = await this.ctx.model.transaction();
      const course = await this.ctx.model.Course.deleteCourseById(id,transaction);
      await this.ctx.model.Favorite.delFavoriteByCourseId(course.Id,transaction);
      const helper =this.ctx.helper;
      let delArray = new Array();
      delArray.push(helper.courseImagePath + course.thumb);
      delArray.push(helper.courseVideoPath + course.videoAddress);
      if (course.qrCode){
          delArray.push(helper.qrCodePath + course.qrCode);
      }
      await app.deleteOssMultiObject(delArray);
      await transaction.commit();
      return true;
    } catch (e) {
      await transaction.rollback();
      return false;
    }
  }

  async getCourseBySpecialColumnId({id = 0, limit = 50, offset =0, thumbName = 'thumb_600_600'}){
    let resultObj = await this.ctx.model.Course.getCourseBySpecialColumnId({
      id,
      limit,
      offset
    });

    const helper = this.ctx.helper;

    resultObj.rows.forEach((element, index)=>{
      element.thumb = helper.signatureUrl(helper.courseImagePath + element.thumb , thumbName);
      element.videoAddress = helper.signatureUrl(helper.courseVideoPath + element.videoAddress);
      if(element.qrCode){
        element.qrCode = helper.signatureUrl(helper.qrCodePath + element.qrCode);
      }
    });

    return resultObj;
  }

  async getCourseByCourseTypeId({id = 0, limit = 10, offset =0, thumbName = 'thumb_600_600'}){
    let resultObj = await this.ctx.model.Course.getCourseByCourseTypeId({id,limit,offset});

    const helper = this.ctx.helper;
    resultObj.rows.forEach((element, index)=>{
      element.thumb = helper.signatureUrl(helper.courseImagePath + element.thumb, thumbName);
      element.videoAddress = helper.signatureUrl(helper.courseVideoPath + element.videoAddress);
      if(element.qrCode){
        element.qrCode = helper.signatureUrl(helper.qrCodePath + element.qrCode);
      }
    });

    return resultObj;
  }

  async getCourseByCondition({courseType = 0,specialColumn = 0,limit = 10, offset =0, thumbName = 'thumb_600_600'}){

    let resultObj = await this.ctx.model.Course.getCourseByCondition({courseType,specialColumn,limit,offset});

    const helper = this.ctx.helper;

    resultObj.rows.forEach((element, index)=>{
      element.thumb = helper.signatureUrl(helper.courseImagePath + element.thumb, thumbName);
      element.videoAddress = helper.signatureUrl(helper.courseVideoPath + element.videoAddress);
      if(element.qrCode){
        element.qrCode = helper.signatureUrl(helper.qrCodePath + element.qrCode);
      }
    });

    return resultObj;
  }

  async searchByKeywords({ offset = 0, limit = 10, keyword='', thumbName = 'thumb_600_600' }){
    let resultObj = await this.ctx.model.Course.searchByKeywords({offset,limit,keyword});

    const helper = this.ctx.helper;
    resultObj.rows.forEach((element, index)=>{
      element.thumb = helper.signatureUrl(helper.courseImagePath + element.thumb, thumbName);
      element.videoAddress = helper.signatureUrl(helper.courseVideoPath + element.videoAddress);
      if(element.qrCode){
        element.qrCode = helper.signatureUrl(helper.qrCodePath + element.qrCode);
      }
    });

    return resultObj;
  }

  async updateQRCodeByCourseId(id,qrCode){
    return await this.ctx.model.Course.updateQRCodeByCourseId(id,qrCode);
  }

  async findCourseObjById(id){
    const course = await this.ctx.model.Course.findCourseObjById(id);
    return course;
  }

}

module.exports = Course;
