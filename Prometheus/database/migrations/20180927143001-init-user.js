'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('user', {
      Id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: STRING(30),
      password: STRING(50),
      headicon: STRING(100),
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('user');
  },
};
