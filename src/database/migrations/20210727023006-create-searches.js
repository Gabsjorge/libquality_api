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
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      repo_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'repositories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('searches');
  }
};
