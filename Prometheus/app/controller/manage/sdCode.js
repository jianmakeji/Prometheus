'use strict';

const Controller = require('egg').Controller;
const Excel = require('exceljs');
const path = require('path');
const fs = require('fs');

class SdCodeController extends Controller {

  async createSdCode() {
    const ctx = this.ctx;

    let query = {
      limit : ctx.helper.parseInt(ctx.request.body.limit),
      specialColumnIds : ctx.request.body.specialColumnIds,
      createUserId : ctx.helper.parseInt(ctx.request.body.createUserId),
    };
    try{
      const specialColumn = await ctx.service.sdCode.create(query);
      if (specialColumn.length > 0){
        let workbook = new Excel.Workbook();
        var worksheet = workbook.addWorksheet('师道码');
        worksheet.columns = [
            { header: '师道码', key: 'code', width: 60 }
        ];

        let fileNameRandom = ctx.helper.randomCodeString(8);
        let filename = fileNameRandom + ".xlsx";

        for (let code of specialColumn){
          worksheet.addRow({code: code});
        }

        ctx.attachment(filename);
        ctx.set('Content-Type','application/octet-stream');
        const filePath =  path.resolve(this.app.config.static.dir,'excel');

        if(!fs.existsSync(filePath)){
          fs.mkdirSync(filePath);
        }
        filename = path.resolve(filePath,filename);

        await workbook.xlsx.writeFile(filename);
        //ctx.body = fs.createReadStream(filename);
        ctx.body = ctx.helper.success('/public/excel/' + fileNameRandom + '.xlsx');
      }

    }
    catch(e){
      console.log(e);
      ctx.body = ctx.helper.failure(e.message);
    }

  }

  async activeSdCode() {
    const ctx = this.ctx;
    let code = ctx.query.code;
    let bindUserId = ctx.helper.parseInt(ctx.query.bindUserId);
    try{
      let result = await ctx.service.sdCode.activeSdCode({code:code,bindUserId:bindUserId});
      if (result.code == 200){
        ctx.body = ctx.helper.success(result.message);
      }
      else{
        ctx.body = ctx.helper.failure(result.message);
      }
    }
    catch(e){
      ctx.body = ctx.helper.failure(e.message);
    }

  }

  async getDataBySdCode() {
    const ctx = this.ctx;

    let query = {
      limit : ctx.helper.parseInt(ctx.query.limit),
      offset : ctx.helper.parseInt(ctx.query.offset),
      sdCode : ctx.query.code,
    };

    try{
      ctx.body = await ctx.service.sdCode.getDataBySdCode(query);
    }
    catch(e){
      console.log(e);
      ctx.body = ctx.helper.failure(e.message);
    }

  }

}

module.exports = SdCodeController;
