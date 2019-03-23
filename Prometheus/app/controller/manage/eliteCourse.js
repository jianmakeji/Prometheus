'use strict';

const Controller = require('egg').Controller;
const request = require('request');
const wxUtil = require('../../util/wxUtils');

class EliteCourseController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      eliteSchoolId: ctx.helper.parseInt(ctx.query.eliteSchoolId),
    };
    ctx.body = await ctx.service.eliteCourse.list(query);
  }

  async show() {
    const ctx = this.ctx;

    ctx.body = await ctx.service.eliteCourse.find(ctx.helper.parseInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    try{
      const course = await ctx.service.eliteCourse.create(ctx.request.body);
      ctx.body = ctx.helper.success('创建成功!');
    }
    catch(e){
      ctx.body = ctx.helper.failure(e.message);
    }

  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const updates = {
      name: ctx.request.body.name,
      describe: ctx.request.body.describe,
      eliteSchoolId: ctx.request.body.eliteSchoolId,
      videoAddress: ctx.request.body.videoAddress,
      duration:ctx.request.body.duration,
    };
    try{
      await ctx.service.eliteCourse.updateEliteCourse({ id, updates });
      ctx.body = ctx.helper.success('更新成功!');
    }
    catch(e){
      ctx.body = ctx.helper.failure(e.message);
    }

  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    try{
      await ctx.service.eliteCourse.del(id);
      ctx.body = ctx.helper.success('删除成功!');
    }
    catch(e){
      ctx.body = ctx.helper.failure(e.message);
    }

  }

  async getEliteCourseByEliteSchoolId(){
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      id: ctx.params.id,
    };
    ctx.body = await ctx.service.eliteCourse.getEliteCourseByEliteSchoolId(query);
  }

  async getQRCode() {
    const ctx = this.ctx;
    const id = ctx.query.id;

    const course = ctx.service.eliteCourse.findEliteCourseObjById(id);
    if (!course.qrCode) {

        const qrFileName = ctx.helper.randomString(10) + '.jpg';
        const qrFilePath = ctx.helper.qrCodePath + qrFileName;

        const tokenBody = await wxUtil.getAccessToken(ctx.helper.wx_appid,ctx.helper.wx_secret);
        const imageRequest = wxUtil.getQRCodeImage(tokenBody, id);
        if (imageRequest != null){
          await imageRequest.then((data)=>{
            ctx.helper.putOssObject(qrFilePath,data);
            ctx.service.eliteCourse.updateQRCodeByEliteCourseId(id, qrFileName);
          });
          ctx.body = ctx.helper.success(ctx.helper.signatureUrl(qrFilePath, undefined));
        }
        else{
          ctx.body = ctx.helper.failure('微信获取二维码失败!');
        }

    } else {
      ctx.body = this.ctx.helper.success(ctx.helper.signatureUrl(ctx.helper.qrCodePath + course.qrCode, undefined));
    }
  }
}

module.exports = EliteCourseController;
