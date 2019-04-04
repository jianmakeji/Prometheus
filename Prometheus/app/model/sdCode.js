'use strict';

module.exports = app => {
  const { INTEGER, DATE, STRING } = app.Sequelize;

  const SdCode = app.model.define('sd_code', {
    Id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: INTEGER,
    specialColumnIds: STRING,
    bindUserId:INTEGER,
    createUserId:INTEGER,
    active:INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  SdCode.associate = function() {
      app.model.SdCode.belongsTo(app.model.User, { sourceKey:'Id', foreignKey:'bindUserId' });
      app.model.SdCode.belongsTo(app.model.ManageUser, { sourceKey:'Id', foreignKey:'createUserId' });
  };

  SdCode.createSdCode = async function(sdCode,transaction){
    return await this.create(sdCode,{
      transaction:transaction
    });
  }

  SdCode.getDataByCode = async function(code){
    return await this.findOne({
      where:{
        code:code
      }
    });
  }

  SdCode.getDataByBindUserId = async function({offset = 0, limit = 10, bindUserId = 0}){
    return await this.findAndCountAll({
      offset,
      limit,
      where:{
        bindUserId:bindUserId
      },
      order: [[ 'created_at', 'desc' ]],
      include: [{
          model: app.model.User,
          attributes: ['nickName','Id','mobile'],
      }],
    });
  }

  SdCode.getDataByCreateUserId = async function({offset = 0, limit = 10, createUserId = 0}){
    return await this.findAndCountAll({
      offset,
      limit,
      where:{
        createUserId:createUserId
      },
      order: [[ 'created_at', 'desc' ]],
      include: [{
          model: app.model.ManageUser,
          attributes: ['username','Id'],
      }],
    });
  }

  SdCode.updateActive = async function(id, active, bindUserId, transaction){
    return await this.update({
          active: active,
          bindUserId:bindUserId
        },{
        transaction:transaction,
        where: {
          Id: id
        }
    });
  }


  return SdCode;
};
