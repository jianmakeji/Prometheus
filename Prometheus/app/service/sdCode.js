'use strict';

const Service = require('egg').Service;

class SdCode extends Service {

  async create({limit = 10 ,specialColumnIds = '', createUserId = 0 }) {
    const ctx = this.ctx;

    let codeArray = new Array();
    for (let i = 0; i < limit; i++){
      let code = ctx.helper.randomCodeString(8);
      let exist = await this.ctx.model.SdCode.getDataByCode(code);
      if (!exist){
        codeArray.push(code);
      }
    }

    let transaction;
    try {
      transaction = await this.ctx.model.transaction();

      for (let sdCode of codeArray){
        let sdCodeObject = {
          code:sdCode,
          specialColumnIds:specialColumnIds,
          createUserId:createUserId,
          active:0
        };
        await this.ctx.model.SdCode.createSdCode(sdCodeObject,transaction);
      }
      await transaction.commit();
      return codeArray;
    } catch (e) {
      await transaction.rollback();
      codeArray.length = 0;
      return codeArray;
    }

  }

  async activeSdCode({code = '', bindUserId = 0}){
    const ctx = this.ctx;
    let activeResult = {};
    let exist = await this.ctx.model.SdCode.getDataByCode(code);

    if (exist){
      if(exist.active == 1){
        activeResult.code = 500;
        activeResult.message = "该师道码已被激活!";
      }
      else{
        let specialColumnIds = exist.specialColumnIds.split(',');
        if (specialColumnIds.length > 0){
          let transaction;
          try {
            transaction = await this.ctx.model.transaction();

            for (let specialColumnId of specialColumnIds){
              let userSpColumnObject = {
                userId:bindUserId,
                specialColumnId:specialColumnId
              };
              await ctx.model.UserSpColumns.createUserSpColumns(userSpColumnObject,transaction);
            }
            await ctx.model.SdCode.updateActive(exist.Id, 1, bindUserId, transaction);
            await transaction.commit();
            activeResult.code = 200;
            activeResult.message = "绑定成功!";
          } catch (e) {
            await transaction.rollback();
            activeResult.code = 500;
            activeResult.message = "绑定失败!";
          }
        }
        else{
          activeResult.code = 500;
          activeResult.message = "该师道码未绑定专题!";
        }
      }
    }
    else{
      activeResult.code = 500;
      activeResult.message = "该师道码不存在!";
    }
    return activeResult;
  }

  async getDataByBindUserId({offset = 0, limit = 10, bindUserId = 0}){
    return await this.ctx.model.SdCode.getDataByBindUserId({
      offset,
      limit,
      bindUserId,
    });
  }

  async getDataByCreateUserId({offset = 0, limit = 10, createUserId = 0}){
    return await this.ctx.model.SdCode.getDataByCreateUserId({
      offset,
      limit,
      createUserId,
    });
  }

  async getDataBySdCode({offset = 0, limit = 10, sdCode = 0}){
    return await this.ctx.model.SdCode.getDataBySdCode({
      offset,
      limit,
      sdCode,
    });
  }
}

module.exports = SdCode;
