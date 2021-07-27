'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('repositories', { 
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      owner: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      issues_count: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      collected_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('repositories');
  }
};
