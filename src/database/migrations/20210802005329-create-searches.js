'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('searches', { 
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      repo_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'repositories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      issues_count: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true
      },
      issues_avg_time: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: true
      },
      issues_std_time: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('searches');
  }
};
