'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const EliteSchool = app.model.define('elite_school', {
    Id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(10),
    schoolId: INTEGER,
    grade: INTEGER,
    subject: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  EliteSchool.associate = function() {
    app.model.EliteSchool.hasOne(app.model.School, {sourceKey:'schoolId',foreignKey: 'Id'});
    app.model.EliteSchool.hasMany(app.model.EliteCourse,{sourceKey:'Id',foreignKey:'eliteSchoolId'});
  };

  EliteSchool.createEliteSchool = async function(eliteSchool){
    return this.create(eliteSchool);
  }

  EliteSchool.deleteEliteSchool = async function(id){
    const eliteSchool = await this.findById(id);
    if (!eliteSchool) {
      throw new Error('eliteSchool not found');
    }
    return eliteSchool.destroy();
  }

  EliteSchool.updateEliteSchool = async function({id,updates}){
    const eliteSchool = await this.findById(id);
    if (!eliteSchool) {
      throw new Error('eliteSchool not found');
    }

    return eliteSchool.update(updates);
  }

  EliteSchool.getEliteSchoolByPage = async function({offset = 0, limit = 10}){
    let resultObj = await this.findAndCountAll({
      offset,
      limit,
      order: [[ 'created_at', 'desc' ], [ 'Id', 'desc' ]],
    });
    return resultObj;
  }
  return EliteSchool;
};
