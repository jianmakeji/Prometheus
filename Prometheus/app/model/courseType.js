'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const CourseType = app.model.define('course_type', {
    Id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(20),
    grade: INTEGER,
    describe: STRING(255),
    created_at: DATE,
    updated_at: DATE,
  });

  CourseType.associate = function() {
    app.model.CourseType.hasMany(app.model.SpecialColumn, { foreignKey: 'courseType'});
    app.model.SpecialColumn.hasMany(app.model.Course,{sourceKey:'Id',foreignKey: 'courseType'});
  };

  CourseType.getCourseTypeByPage = async function({ offset = 0, limit = 10 }){
    return this.findAndCountAll({
      offset,
      limit,
      order: [[ 'id', 'asc' ]],
    });
  }

  CourseType.getCourseTypeById = async function(id){
    const courseType = await this.findById(id,{
      include:[{
        model:this.ctx.model.SpecialColumn
      }]
    });
    if (!courseType) {
      throw new Error('courseType not found');
    }
    return courseType;
  }

  CourseType.updateCourseType = async function({ id, updates }){
    const courseType = await this.findById(id);
    if (!courseType) {
      throw new Error('courseType not found');
    }
    return courseType.update(updates);
  }

  CourseType.deleteCourseTypeById = async function(id){
    const courseType = await this.findById(id);
    if (!courseType) {
      throw new Error('courseType not found');
    }
    return courseType.destroy();
  }
  return CourseType;
};
