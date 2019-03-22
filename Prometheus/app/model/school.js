'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const School = app.model.define('school', {
    Id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(10),
    bg: STRING(50),
    created_at: DATE,
    updated_at: DATE,
  });

  School.associate = function() {
    app.model.School.hasMany(app.model.EliteSchool, {sourceKey:'Id',foreignKey: 'schoolId'});
  };

  School.createSchool = async function(school){
    return this.create(course);
  }

  School.deleteSchool = async function(id){
    const school = await this.findById(id);
    if (!school) {
      throw new Error('school not found');
    }
    return school.destroy();
  }

  School.updateSchool = async function({id,updates}){
    const school = await this.findById(id);
    if (!school) {
      throw new Error('school not found');
    }

    return school.update(updates);
  }

  School.getSchoolByPage = async function({offset = 0, limit = 10}){
    let resultObj = await this.findAndCountAll({
      offset,
      limit,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    });
    return resultObj;
  }

  School.getSchoolById = async function(id){
    return await this.findById(id);
  }

  return School;
};
