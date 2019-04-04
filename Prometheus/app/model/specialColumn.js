'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, FLOAT } = app.Sequelize;

  const SpecialColumn = app.model.define('special_column', {
    Id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(16),
    teacherId: INTEGER,
    subject: INTEGER,
    thumb: STRING(30),
    briefImages: STRING(255),
    grade: INTEGER,
    describe: STRING(50),
    price: FLOAT,
    collectNum: INTEGER,
    recommend: INTEGER,
    poster: STRING(30),
    downloadFile: STRING(35),
    created_at: DATE,
    updated_at: DATE,
  });

  SpecialColumn.associate = function() {
    app.model.SpecialColumn.belongsTo(app.model.Teacher, {targetKey: 'Id', foreignKey: 'teacherId'});
    app.model.SpecialColumn.hasMany(app.model.SpecialCourse,{sourceKey:'Id',foreignKey: 'specialColumn'});
    app.model.SpecialColumn.hasMany(app.model.UserSpColumns,{sourceKey:'Id',foreignKey: 'specialColumnId'});

    app.model.SpecialColumn.belongsToMany(app.model.User,{
      foreignKey:'special_column',
      through:{
        model:app.model.Exchange,
        unique:false,
      }
    });

  };

  SpecialColumn.findByIdWithTeacher = async function(id, teacherId) {
    return await this.findOne({
      where: { id, teacherId: teacherId },
    });
  };

  SpecialColumn.getSpecialColumnByPage = async function({ offset = 0, limit = 10}){
    let resultObj = await this.findAndCountAll({
      offset,
      limit,
      order: [[ 'created_at', 'desc' ]],
      include: [{
          model:app.model.Teacher,
          attributes: ['name','Id'],
          as: 'teacher',
      }],
    });
    return resultObj;
  }

  SpecialColumn.getSpecialColumnById = async function(id){
    const specialColumn = await this.findById(id,{
      include: [{
          model: app.model.Teacher,
          attributes: ['name','subject','brief','avatar'],
          as: 'teacher',
      }],
    });
    return specialColumn;
  }

  SpecialColumn.getSpecialColumnsByTeacherId = async function({id = 0, limit = 10, offset =0}){
    const resultObj =  this.ctx.model.SpecialColumn.findAndCountAll({
      offset,
      limit,
      order: [[ 'created_at', 'desc' ]],
      where: {
          teacherId:id,
      },
    });
    return resultObj;
  }

  SpecialColumn.getRecommendSpecialColumn = async function(limit){
    return await this.findAll({
      limit,
      order: [['created_at','desc']],
      where:{
        recommend : 1
      }
    });
  }

  SpecialColumn.addCollectNum = async function(id,transaction){
    return await this.update({
          collectNum: app.Sequelize.fn('1 + abs', app.Sequelize.col('collectNum'))
        },{
        transaction:transaction,
        where: {
          Id: id
        }
    });
  }

  SpecialColumn.downloadByCondition = async function(query){
    let condition = {
      offset,
      limit,
      order: [[ 'created_at', 'desc' ], [ 'Id', 'desc' ]],
      where: {

      }
    };

    if (query.grade != 0){
      condition.where.grade = query.grade;
    }

    if (query.subject != 0){
      condition.where.subject = query.subject;
    }

    let resultObj = await this.findAndCountAll(condition);
    return resultObj;
  }
  return SpecialColumn;
};
