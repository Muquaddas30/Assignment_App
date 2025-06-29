'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Answer', {
      studentAnswer: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      submissionId: {
        type: Sequelize.INTEGER
      },
      questionId: {
        type: Sequelize.INTEGER
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Answer');
  }
};
