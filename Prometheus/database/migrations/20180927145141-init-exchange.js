'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, FLOAT } = Sequelize;
    await queryInterface.createTable('exchange', {
      Id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: INTEGER,
      special_column: INTEGER,
      price: FLOAT,
      created_at: DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('exchange');
  },
};
