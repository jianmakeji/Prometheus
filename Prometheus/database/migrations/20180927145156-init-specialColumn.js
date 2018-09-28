'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, FLOAT } = Sequelize;
    await queryInterface.createTable('special_column', {
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
  },

  down: async queryInterface => {
    await queryInterface.dropTable('special_column');
  },
};
