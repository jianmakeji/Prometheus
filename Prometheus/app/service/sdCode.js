'use strict';

const Service = require('egg').Service;

class SdCode extends Service {

  async create({limit = 10 ,specialColumnIds = '', bindUserId = 0, createUserId = 0 }) {
    const ctx = this.ctx;

    let codeArray = new Array();
    for (let i = 0; i < limit; i++){
      let code = ctx.helper.randomCodeString(8);
      let exist = this.ctx.model.SdCode.getDataByCode(code);
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
          bindUserId:bindUserId,
          createUserId:createUserId,
          active:0
        };
        this.ctx.model.SdCode.createSdCode(sdCodeObject,transaction);
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
    let exist = this.ctx.model.SdCode.getDataByCode(code);

    if (exist){
      if(exist.active){
        
      }
    }
  }
}

module.exports = SdCode;
