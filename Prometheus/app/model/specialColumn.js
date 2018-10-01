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
    courseType: INTEGER,
    teacherId: INTEGER,
    thumb: STRING(30),
    describe: STRING(50),
    price: FLOAT,
    created_at: DATE,
    updated_at: DATE,
  });

  SpecialColumn.associate = function() {
    app.model.SpecialColumn.belongsTo(app.model.Teacher, {targetKey: 'Id', foreignKey: 'teacherId'});
    app.model.SpecialColumn.belongsTo(app.model.CourseType, { foreignKey: 'courseType'});
    app.model.SpecialColumn.hasMany(app.model.Course,{sourceKey:'Id',foreignKey: 'specialColumn'}});

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

  return SpecialColumn;
};
