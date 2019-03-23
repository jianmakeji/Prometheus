'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const EliteCourse = app.model.define('elite_course', {
    Id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(30),
    describe: STRING(255),
    eliteSchoolId: INTEGER,
    qrCode: STRING(30),
    duration: INTEGER,
    lookingNum:INTEGER,
    teacherId:INTEGER,
    videoAddress: STRING(30),
    created_at: DATE,
    updated_at: DATE,
  });

  EliteCourse.associate = function() {
    app.model.EliteCourse.belongsTo(app.model.EliteSchool, {targetKey: 'Id', foreignKey: 'eliteSchoolId'});
    app.model.EliteCourse.belongsTo(app.model.Teacher, {targetKey: 'Id', foreignKey: 'teacherId'});
    app.model.EliteCourse.hasMany(app.model.Comment,{sourceKey:'Id',foreignKey:'eliteCourseId'});
  };

  EliteCourse.getEliteCourseByPage = async function({offset = 0, limit = 10, eliteSchoolId = 0}){
    let condition = {
        offset,
        limit,
        where:{},
        order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
        include: [{
            model: app.model.EliteSchool,
            attributes: ['name','Id'],
        }],
    };

    if (eliteSchoolId != 0){
      condition.where.eliteSchoolId = eliteSchoolId;
    }
    let resultObj = await this.findAndCountAll(condition);
    return resultObj;
  }

  EliteCourse.getEliteCourseById = async function(id,transaction){
    const eliteCourse = await this.findById(id,{
      transaction:transaction,
      include: [{
          model: app.model.EliteSchool,
          attributes: ['name','Id'],
      },{
          model: app.model.Teacher,
          attributes: ['name','Id','avatar','brief'],
      }],
    });
    return eliteCourse;
  }

  EliteCourse.createEliteCourse = async function(eliteCourse){
    return await this.create(eliteCourse);
  }

  EliteCourse.updateEliteCourse = async function({id, updates}){
    const course = await this.findById(id);
    if (!course) {
      throw new Error('course not found');
    }

    return course.update(updates);
  }

  EliteCourse.deleteEliteCourseById = async function(id,transaction){
    const course = await this.findById(id);
    if (!course) {
      throw new Error('course not found');
    }
    return course.destroy({
      transaction:transaction
    });
  }

  EliteCourse.getEliteCourseByEliteSchoolId = async function({id = 0, limit = 50, offset =0}){
    let resultObj = await this.findAndCountAll({
      offset,
      limit,
      order: [[ 'id', 'asc' ]],
      where: {
          eliteSchoolId:id,
      },
    });
    return resultObj;
  }

  EliteCourse.searchByKeywords = async function({ offset = 0, limit = 10, keyword=''}){
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
          model: app.model.EliteSchool,
          attributes: ['name','Id'],
      }],
    });
    return resultObj;
  }

  EliteCourse.updateQRCodeByEliteCourseId = async function(id,qrCode){
    return await this.update({
          qrCode: qrCode
        },{
        where: {
          Id: id
        }
    });
  }

  EliteCourse.findEliteCourseObjById = async function(id){
    return await this.findById(id);
  }

  EliteCourse.addLookingNum = async function(id,transaction){
    return await this.update({
          lookingNum: app.Sequelize.fn('1 + abs', app.Sequelize.col('lookingNum'))
        },{
        transaction:transaction,
        where: {
          Id: id
        }
    });
  }
  return EliteCourse;
};
