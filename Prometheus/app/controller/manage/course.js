'use strict';

const Controller = require('egg').Controller;
const request = require('request');
const wxUtil = require('../../util/wxUtils');

class CourseController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };
    ctx.body = await ctx.service.course.list(query);
  }

  async show() {
    const ctx = this.ctx;

    ctx.body = await ctx.service.course.find({id:ctx.helper.parseInt(ctx.params.id)});
  }

  async create() {
    const ctx = this.ctx;
    const course = await ctx.service.course.create(ctx.request.body);
    ctx.body = ctx.app.success('创建成功!');
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const updates = {
      name: ctx.request.body.name,
      describe: ctx.request.body.describe,
      courseType: ctx.request.body.courseType,
      specialColumn: ctx.request.body.specialColumn,
      thumb: ctx.request.body.thumb,
      videoAddress: ctx.request.body.videoAddress,
      duration:ctx.request.body.duration,
    };
    await ctx.service.course.update({ id, updates });
    ctx.body = ctx.app.success('更新成功!');
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    await ctx.service.course.del(id);
    ctx.body = ctx.app.success('删除成功!');
  }

  async getCourseBySpecialColumnId(){
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      id: ctx.params.id,
    };
    ctx.body = await ctx.service.course.getCourseBySpecialColumnId(query);
  }

  async getCourseByCourseTypeId(){
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      id: ctx.params.id,
    };
    ctx.body = await ctx.service.course.getCourseByCourseTypeId(query);
  }

  async getCourseByCondition(){
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      courseType: ctx.helper.parseInt(ctx.query.courseType),
      specialColumn: ctx.helper.parseInt(ctx.query.specialColumn),
    };
    ctx.body = await ctx.service.course.getCourseByCondition(query);
  }

  async getQRCode() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const course = ctx.service.course.findCourseObjById(id);
    if (!course.qrCode) {

        const qrFileName = ctx.app.randomString(10) + '.jpg';
        const qrFilePath = ctx.app.qrCodePath + qrFileName;

        const tokenBody = await wxUtil.getAccessToken(ctx.app.wx_appid,ctx.app.wx_secret);
        const imageRequest = wxUtil.getQRCodeImage(tokenBody, id);
        if (imageRequest != null){
          await imageRequest.then((data)=>{
            ctx.app.putOssObject(qrFilePath,data);
            ctx.service.course.updateQRCodeByCourseId(id, qrFileName);
          });
          ctx.body = ctx.app.success(ctx.app.signatureUrl(qrFilePath, undefined));
        }
        else{
          ctx.body = ctx.app.failure('微信获取二维码失败!');
        }

    } else {
      ctx.body = this.ctx.app.success(ctx.app.signatureUrl(ctx.app.qrCodePath + course.qrCode, undefined));
    }
  }
}

module.exports = CourseController;
