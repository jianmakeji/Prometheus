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
    schoolId: INTEGER,
    teacherId: INTEGER,
    subject: INTEGER,
    thumb: STRING(30),
    briefImages: STRING(255),
    grade: INTEGER,
    describe: STRING(50),
    price: FLOAT,
    collectNum: INTEGER,
    recommand: INTEGER,
    poster: STRING(30),
    created_at: DATE,
    updated_at: DATE,
  });

  SpecialColumn.associate = function() {
    app.model.SpecialColumn.belongsTo(app.model.Teacher, {targetKey: 'Id', foreignKey: 'teacherId'});
    app.model.SpecialColumn.hasMany(app.model.SpecialCourse,{sourceKey:'Id',foreignKey: 'specialColumn'});

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
      order: [[ 'id', 'asc' ]],
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
          attributes: ['name','subject','brief'],
          as: 'teacher',
      }],
    });
    return specialColumn;
  }

  SpecialColumn.getSpecialColumnsByTeacherId = async function({id = 0, limit = 10, offset =0}){
    const resultObj =  this.ctx.model.SpecialColumn.findAndCountAll({
      offset,
      limit,
      order: [[ 'id', 'asc' ]],
      where: {
          teacherId:id,
      },
    });
    return resultObj;
  }

  SpecialColumn.getRecommandSpecialColumn = async function(limit){
    await this.findAll({
      limit,
      order: [['created_at','desc']],
      where:{
        recommand : 1
      }
    });
  }

  EliteCourse.addCollectNum = async function(id,transaction){
    return await this.update({
          collectNum: app.Sequelize.fn('1 + abs', app.Sequelize.col('collectNum'))
        },{
        transaction:transaction,
        where: {
          Id: id
        }
    });
  }

  return SpecialColumn;
};
