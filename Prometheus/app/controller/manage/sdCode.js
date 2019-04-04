'use strict';

const Controller = require('egg').Controller;
const Excel = require('exceljs');

class SdCodeController extends Controller {

  async createSdCode() {
    const ctx = this.ctx;
    let query = {
      limit : ctx.helper.parseInt(ctx.query.limit),
      specialColumnIds : ctx.query.specialColumnIds,
      createUserId : ctx.helper.parseInt(ctx.query.createUserId),
    };
    try{
      const specialColumn = await ctx.service.sdCode.create(query);
      if (specialColumn.length > 0){
        let workbook = new Excel.Workbook();
        var worksheet = workbook.addWorksheet('师道码');
        worksheet.columns = [
            { header: '师道码', key: 'code', width: 60 }
        ];

        let filename = "师道码.xlsx";

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
        ctx.body = fs.createReadStream(filename);
      }

    }
    catch(e){
      ctx.body = ctx.helper.failure(e.message);
    }

  }

  async activeSdCode() {
    const ctx = this.ctx;
    let code = ctx.query.code);
    let bindUserId = ctx.helper.parseInt(ctx.query.bindUserId);
    try{
      await ctx.service.sdCode.activeSdCode({code:code,bindUserId:bindUserId});
      ctx.body = ctx.helper.success('删除成功!');
    }
    catch(e){
      ctx.body = ctx.helper.failure(e.message);
    }

  }


}

module.exports = SdCodeController;
