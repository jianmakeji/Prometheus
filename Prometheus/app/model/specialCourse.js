'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const SpecialCourse = app.model.define('special_course', {
    Id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(30),
    describe: STRING(255),
    specialColumn: INTEGER,
    qrCode: STRING(30),
    duration: INTEGER,
    lookingNum:INTEGER,
    videoAddress: STRING(30),
    created_at: DATE,
    updated_at: DATE,
  });

  SpecialCourse.associate = function() {
    app.model.SpecialCourse.belongsTo(app.model.SpecialColumn, {targetKey: 'Id', foreignKey: 'specialColumn'});
    app.model.SpecialCourse.hasMany(app.model.Comment,{sourceKey:'Id',foreignKey:'specialCourseId'});
  };

  SpecialCourse.getSpecialCourseByPage = async function({offset = 0, limit = 10, specialColumnId = 0}){
    let condition = {
      offset,
      limit,
      where:{},
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
      include: [{
          model: app.model.SpecialColumn,
          attributes: ['name','Id'],
      }],
    };

    if (specialColumnId > 0){
      condition.where.specialColumn = specialColumnId;
    }
    let resultObj = await this.findAndCountAll(condition);
    return resultObj;
  }

  SpecialCourse.getSpecialCourseById = async function(id,transaction){
    const course = await this.findById(id,{
      transaction:transaction,
      include: [{
          model: app.model.SpecialColumn,
          attributes: ['name','Id'],
      }],
    });
    return course;
  }

  SpecialCourse.createSpecialCourse = async function(course){
    return await this.create(course);
  }

  SpecialCourse.updateSpecialCourse = async function({id, updates}){
    const course = await this.findById(id);
    if (!course) {
      throw new Error('course not found');
    }

    return course.update(updates);
  }

  SpecialCourse.deleteSpecialCourseById = async function(id,transaction){
    const course = await this.findById(id);
    if (!course) {
      throw new Error('course not found');
    }
    return course.destroy({
      transaction:transaction
    });
  }

  SpecialCourse.getSpecialCourseBySpecialColumnId = async function({id = 0, limit = 50, offset =0}){
    let resultObj = await this.findAndCountAll({
      offset,
      limit,
      order: [[ 'id', 'asc' ]],
      include: [{
        model: app.model.SpecialColumn,
        attributes: ['name','Id'],
      }],
      where: {
          specialColumn:id,
      },
    });
    return resultObj;
  }

  SpecialCourse.getSpecialCourseByCondition = async function({specialColumn = 0,limit = 10, offset =0}){
    let condition = {
      offset,
      limit,
      order: [[ 'id', 'asc' ]],
    };

    if (specialColumn == 0){
      condition.include = [{
        model: app.model.SpecialColumn,
        attributes: ['name','Id'],
      }];
    }
    else{
      condition.where = {
        specialColumn:specialColumn,
      };
    }

    let resultObj = await this.findAndCountAll(condition);
    return resultObj;
  }

  SpecialCourse.searchByKeywords = async function({ offset = 0, limit = 10, keyword=''}){
    let resultObj = await this.findAndCountAll({
      offset,
      limit,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
      where: {
          name:{
            [app.Sequelize.Op.like]: '%'+keyword+'%',
          },
      },
      include: [{
          model: app.model.SpecialColumn,
          attributes: ['name','Id'],
      }],
    });
    return resultObj;
  }

  SpecialCourse.updateQRCodeBySpecialCourseId = async function(id,qrCode){
    return await this.update({
          qrCode: qrCode
        },{
        where: {
          Id: id
        }
    });
  }

  SpecialCourse.findSpecialCourseObjById = async function(id){
    return await this.findById(id);
  }

  SpecialCourse.addLookingNum = async function(id,transaction){
    return await this.update({
          lookingNum: app.Sequelize.fn('1 + abs', app.Sequelize.col('lookingNum'))
        },{
        transaction:transaction,
        where: {
          Id: id
        }
    });
  }
  return SpecialCourse;
};
