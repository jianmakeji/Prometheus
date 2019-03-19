'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Course = app.model.define('course', {
    Id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(30),
    describe: STRING(255),
    courseType: INTEGER,
    specialColumn: INTEGER,
    thumb: STRING(30),
    qrCode: STRING(30),
    duration: INTEGER,
    lookingNum:INTEGER,
    videoAddress: STRING(30),
    created_at: DATE,
    updated_at: DATE,
  });

  Course.associate = function() {
    app.model.Course.belongsTo(app.model.SpecialColumn, {targetKey: 'Id', foreignKey: 'specialColumn'});
    app.model.Course.belongsTo(app.model.CourseType, {targetKey: 'Id', foreignKey: 'courseType'});
    app.model.Course.hasMany(app.model.Comment,{sourceKey:'Id',foreignKey:'courseId'});
  };

  Course.getCourseByPage = async function({offset = 0, limit = 10}){
    let resultObj = await this.findAndCountAll({
      offset,
      limit,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
      include: [{
          model: app.model.SpecialColumn,
          attributes: ['name','Id'],
      },{
        model: app.model.CourseType,
        attributes: ['name','Id'],
      }],
    });
    return resultObj;
  }

  Course.getCourseById = async function(id,transaction){
    const course = await this.findById(id,{
      transaction:transaction,
      include: [{
          model: app.model.SpecialColumn,
          attributes: ['name','Id'],
      },{
        model: app.model.CourseType,
        attributes: ['name','Id'],
      }],
    });
    return course;
  }

  Course.createCourse = async function(course){
    return this.create(course);
  }

  Course.updateCourse = async function({id, updates}){
    const course = await this.findById(id);
    if (!course) {
      throw new Error('course not found');
    }

    return course.update(updates);
  }

  Course.deleteCourseById = async function(id,transaction){
    const course = await this.findById(id);
    if (!course) {
      throw new Error('course not found');
    }
    return course.destroy({
      transaction:transaction
    });
  }

  Course.getCourseBySpecialColumnId = async function({id = 0, limit = 50, offset =0}){
    let resultObj = await this.findAndCountAll({
      offset,
      limit,
      order: [[ 'id', 'asc' ]],
      include: [{
        model: app.model.CourseType,
        attributes: ['name','Id'],
      }],
      where: {
          specialColumn:id,
      },
    });
    return resultObj;
  }

  Course.getCourseByCourseTypeId = async function({id = 0, limit = 10, offset =0}){
    let resultObj = await this.findAndCountAll({
      offset,
      limit,
      order: [[ 'id', 'asc' ]],
      include: [{
          model: app.model.SpecialColumn,
          attributes: ['name','Id'],
      }],
      where: {
          courseType:id,
      },
    });
    return resultObj;
  }

  Course.getCourseByCondition = async function({courseType = 0,specialColumn = 0,limit = 10, offset =0}){
    let condition = {
      offset,
      limit,
      order: [[ 'id', 'asc' ]],
    };

    if (courseType == 0 && specialColumn == 0){
      condition.include = [{
        model: app.model.SpecialColumn,
        attributes: ['name','Id'],
      },{
        model: app.model.CourseType,
        attributes: ['name','Id'],
      }];
    }
    else if (courseType != 0 && specialColumn == 0){
      condition.include = [{
        model: app.model.SpecialColumn,
        attributes: ['name','Id'],
      }];
      condition.where = {
        courseType:courseType,
      };
    }
    else if (courseType == 0 && specialColumn != 0){
      condition.include = [{
        model: app.model.CourseType,
        attributes: ['name','Id'],
      }];
      condition.where = {
        specialColumn:specialColumn,
      };
    }
    else if (courseType != 0 && specialColumn != 0){
      condition.where = {
        courseType:courseType,
        specialColumn:specialColumn,
      };
    }

    let resultObj = await this.findAndCountAll(condition);
    return resultObj;
  }

  Course.searchByKeywords = async function({ offset = 0, limit = 10, keyword=''}){
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
      },{
        model: app.model.CourseType,
        attributes: ['name','Id'],
      }],
    });
    return resultObj;
  }

  Course.updateQRCodeByCourseId = async function(id,qrCode){
    return await this.update({
          qrCode: qrCode
        },{
        where: {
          Id: id
        }
    });
  }

  Course.findCourseObjById = async function(id){
    return await this.findById(id);
  }

  Course.addLookingNum = async function(id,transaction){
    return await this.update({
          lookingNum: app.Sequelize.fn('1 + abs', app.Sequelize.col('lookingNum'))
        },{
        transaction:transaction,
        where: {
          Id: id
        }
    });
  }
  return Course;
};
