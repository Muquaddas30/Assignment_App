'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Quiz', {
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('active', 'pending', 'submitted'),
        allowNull: false
      },
      teacherId: {
        type: Sequelize.INTEGER
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Quiz');
  }
};
